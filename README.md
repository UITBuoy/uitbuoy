<div align="center">
<img src=".\apps\docs\assets\hero.png" width="300px" />
</div>

# UIT Buoy

## About source code

This source code is inititated with a monorepo tool named **Turbo Repo** which helps us store multiple source code into a one unified monorepo. More information about **Turbo Repo** [here](https://turbo.build/repo/docs) 

### Source code structure
`apps`: contains all deployable app in our project:
- `api`: default backend source code, handle authentication, manage users, courses, etc.
- `mobile`: mobile source code, written in TS with React Native, using Expo for managing the app
- `docs`: documentation web page, written in NextJs
- `web`: introduction of the app, running in Web, written in NextJs

### Installation

Install all dependencies with the following command
```bash
pnpm i
```

Install new dependencies
```bash
pnpm add <dependencies> --filter=<workspace>
```

`dependencies`: The dependencies you want to add to the project  

`workspace`: app/package where you want to install

## Code of conduct

### Commit message template

```
git commit -m "<type>:<message> (<task code>)"
```

`type`: describe the type of the task  
- `feat`: add something related to a new feature
- `doc`: add documentation about a portion of the source code
- `deps`: add new dependencies to the project
- `refactor`: refactor an existing module without breaking its functionality
- `fix`: fix a bug  

`message`: a short sentence describing about what you have done in this commit

`task code` *(Optional)*: The code of the task in Jira

## Development

To run development mode of each app, refer to the detail documentation of each app

`mobile`: [README.md](.\apps\mobile\README.md) 

`api`: [README.md](.\apps\api\README.md) 

