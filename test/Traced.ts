import * as U from './util'
import * as B from '../src/boolean'
import { pipe } from '../src/function'
import { getStructMonoid, Monoid } from '../src/Monoid'
import * as _ from '../src/Traced'

// Adapted from https://chshersh.github.io/posts/2019-03-25-comonadic-builders

interface Settings {
  readonly settingsHasLibrary: boolean
  readonly settingsGitHub: boolean
  readonly settingsTravis: boolean
}

const M: Monoid<Settings> = getStructMonoid({
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

const buildProject = (projectName: string): ProjectBuilder => (settings) => ({
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
  describe('pipeables', () => {
    it('map', () => {
      const wa = buildProject('myproject')
      U.deepStrictEqual(pipe(wa, _.map(getProjectName))(M.empty), 'myproject')
    })
  })

  it('getComonad', () => {
    const wa = buildProject('myproject')
    U.deepStrictEqual(C.extract(wa), {
      projectName: 'myproject',
      projectHasLibrary: false,
      projectGitHub: false,
      projectTravis: false
    })
    U.deepStrictEqual(C.extract(C.extend(wa, hasLibraryB)), {
      projectName: 'myproject',
      projectHasLibrary: true,
      projectGitHub: false,
      projectTravis: false
    })
  })

  it('tracks', () => {
    const travisB = _.tracks(M, (project: Project): Settings => ({ ...M.empty, settingsTravis: project.projectGitHub }))
    U.deepStrictEqual(C.extract(C.extend(buildProject('travis'), travisB)), {
      projectName: 'travis',
      projectHasLibrary: false,
      projectGitHub: false,
      projectTravis: false
    })
    U.deepStrictEqual(C.extract(C.extend(C.extend(buildProject('github-travis'), gitHubB), travisB)), {
      projectName: 'github-travis',
      projectHasLibrary: false,
      projectGitHub: true,
      projectTravis: true
    })
  })

  it('listen', () => {
    U.deepStrictEqual(C.extract(_.listen(buildProject('myproject'))), [
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
