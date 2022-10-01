import { pipe } from '../src/Function'
import type { Monoid } from '../src/Monoid'
import { struct } from '../src/Monoid'
import * as _ from '../src/Traced'
import { deepStrictEqual } from './util'
import * as B from '../src/boolean'

// Adapted from https://chshersh.github.io/posts/2019-03-25-comonadic-builders

interface Settings {
  readonly settingsHasLibrary: boolean
  readonly settingsGitHub: boolean
  readonly settingsTravis: boolean
}

const M: Monoid<Settings> = struct({
  settingsHasLibrary: B.MonoidAny,
  settingsGitHub: B.MonoidAny,
  settingsTravis: B.MonoidAny
})

const C = _.getComonad(M)

interface Project {
  readonly projectName: string
  readonly projectHasLibrary: boolean
  readonly projectGitHub: boolean
  readonly projectTravis: boolean
}

interface ProjectBuilder extends _.Traced<Settings, Project> {}

const buildProject =
  (projectName: string): ProjectBuilder =>
  (settings) => ({
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
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    const wa = buildProject('myproject')
    deepStrictEqual(pipe(wa, _.map(getProjectName))(M.empty), 'myproject')
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getComonad', () => {
    const wa = buildProject('myproject')
    deepStrictEqual(C.extract(wa), {
      projectName: 'myproject',
      projectHasLibrary: false,
      projectGitHub: false,
      projectTravis: false
    })
    deepStrictEqual(C.extract(pipe(wa, C.extend(hasLibraryB))), {
      projectName: 'myproject',
      projectHasLibrary: true,
      projectGitHub: false,
      projectTravis: false
    })
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('tracks', () => {
    const travisB = _.tracks(M)((project: Project): Settings => ({ ...M.empty, settingsTravis: project.projectGitHub }))
    deepStrictEqual(C.extract(pipe(buildProject('travis'), C.extend(travisB))), {
      projectName: 'travis',
      projectHasLibrary: false,
      projectGitHub: false,
      projectTravis: false
    })
    deepStrictEqual(C.extract(pipe(buildProject('github-travis'), C.extend(gitHubB), C.extend(travisB))), {
      projectName: 'github-travis',
      projectHasLibrary: false,
      projectGitHub: true,
      projectTravis: true
    })
  })

  it('listen', () => {
    deepStrictEqual(C.extract(_.listen(buildProject('myproject'))), [
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
    deepStrictEqual(
      C.extract(
        pipe(
          buildProject('myproject'),
          _.listens((settings) => settings.settingsTravis)
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
    deepStrictEqual(
      C.extract(
        pipe(
          buildProject('myproject'),
          _.censor((settings) => ({
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
