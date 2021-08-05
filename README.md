# shinka-app

The electron app.

## How to get this thing to work

1. `git clone --recurse-submodules https://github.com/kawuchuu/shinka-app.git`

2. `npm i` or `yarn`

3. `cd shinka`
4. `npm i` or `yarn`
5. `cd ..`
6. `npm run electron:serve` or `yarn electron:serve`
7. To build: `npm run electron:build` or `yarn electron:build`

## Command line arguments

These command line arguments should only be used for development purposes.

**App:**
- `--disableBot` - only launch the app

**Bot:**
- `--useServer` - enables the Shinka express server
- `--devState` - use dev state header for express server

Note: This README is incomplete.