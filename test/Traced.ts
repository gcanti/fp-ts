import * as assert from 'assert'
import { getStructMonoid, monoidAny, Monoid } from '../src/Monoid'
import { Traced, traced, getComonad, tracks, listen, listens, censor } from '../src/Traced'
import { pipe } from '../src/pipeable'

// Adapted from https://chshersh.github.io/posts/2019-03-25-comonadic-builders

interface Settings {
  readonly settingsHasLibrary: boolean
  readonly settingsGitHub: boolean
  readonly settingsTravis: boolean
}

const M: Monoid<Settings> = getStructMonoid({
  settingsHasLibrary: monoidAny,
  settingsGitHub: monoidAny,
  settingsTravis: monoidAny
})

const C = getComonad(M)

interface Project {
  readonly projectName: string
  readonly projectHasLibrary: boolean
  readonly projectGitHub: boolean
  readonly projectTravis: boolean
}

interface ProjectBuilder extends Traced<Settings, Project> {}

const buildProject = (projectName: string): ProjectBuilder => settings => ({
  projectName,
  projectHasLibrary: settings.settingsHasLibrary,
  projectGitHub: settings.settingsGitHub,
  projectTravis: settings.settingsTravis
})

const hasLibraryB = (wa: ProjectBuilder): Project => {
  const p = { ...M.empty, settingsHasLibrary: true }
  return wa(p)
}

const gitHubB = (wa: ProjectBuilder): Project => {
  const p = { ...M.empty, settingsGitHub: true }
  return wa(p)
}

const getProjectName = (project: Project): string => project.projectName

describe('Traced', () => {
  it('map', () => {
    const wa = buildProject('myproject')
    assert.deepStrictEqual(traced.map(wa, getProjectName)(M.empty), 'myproject')
  })

  it('getComonad', () => {
    const wa = buildProject('myproject')
    assert.deepStrictEqual(C.extract(wa), {
      projectName: 'myproject',
      projectHasLibrary: false,
      projectGitHub: false,
      projectTravis: false
    })
    assert.deepStrictEqual(C.extract(C.extend(wa, hasLibraryB)), {
      projectName: 'myproject',
      projectHasLibrary: true,
      projectGitHub: false,
      projectTravis: false
    })
  })

  it('tracks', () => {
    const travisB = tracks(M, (project: Project): Settings => ({ ...M.empty, settingsTravis: project.projectGitHub }))
    assert.deepStrictEqual(C.extract(C.extend(buildProject('travis'), travisB)), {
      projectName: 'travis',
      projectHasLibrary: false,
      projectGitHub: false,
      projectTravis: false
    })
    assert.deepStrictEqual(C.extract(C.extend(C.extend(buildProject('github-travis'), gitHubB), travisB)), {
      projectName: 'github-travis',
      projectHasLibrary: false,
      projectGitHub: true,
      projectTravis: true
    })
  })

  it('listen', () => {
    assert.deepStrictEqual(C.extract(listen(buildProject('myproject'))), [
      {
        projectName: 'myproject',
        projectHasLibrary: false,
        projectGitHub: false,
        projectTravis: false
      },
      {
        settingsHasLibrary: false,
        settingsGitHub: false,
        settingsTravis: false
      }
    ])
  })

  it('listens', () => {
    assert.deepStrictEqual(
      C.extract(
        pipe(
          buildProject('myproject'),
          listens(settings => settings.settingsTravis)
        )
      ),
      [
        {
          projectName: 'myproject',
          projectHasLibrary: false,
          projectGitHub: false,
          projectTravis: false
        },
        false
      ]
    )
  })

  it('censor', () => {
    assert.deepStrictEqual(
      C.extract(
        pipe(
          buildProject('myproject'),
          censor(settings => ({
            ...settings,
            settingsHasLibrary: !settings.settingsHasLibrary
          }))
        )
      ),
      {
        projectName: 'myproject',
        projectHasLibrary: true,
        projectGitHub: false,
        projectTravis: false
      }
    )
  })
})
