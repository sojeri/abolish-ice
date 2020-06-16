# This is a shadow fork of rossabaker/abolish-ice-graphiti

See [original repo](https://github.com/rossabaker/abolish-ice-graphiti).

## Make your contributor graph say Abolish ICE

![Contributor Graph](graph.png)

## Installing dependencies

Run `yarn` to install deps.

## Usage

1. Make any changes you want to persist between runs to the `develop` branch. If you commit them to `abolish-ice`, they will get wiped the next time you reset and paint your graph!
2. Run reset.js to reset the `abolish-ice` branch
3. Run paint.sh to paint your contributions graph anew

Note that even if you've never run this before, you'll need to run reset first to generate the dates for the paint script.

```sh
node reset.js [--verbose]
./paint.sh
```

### Calculating new dates

If you want to calculate new dates but handle the reset yourself -- common if you want to use branch delete instead of reset HEAD -- run instead as:


```sh
node reset.js --calc
./paint.sh
```

## Troubleshooting

### It didn't show up

See the [guide on which contributions count](https://help.github.com/en/github/setting-up-and-managing-your-github-profile/why-are-my-contributions-not-showing-up-on-my-profile).
Specifically, make sure:

* The repository you run paint.sh in is not a fork.
* You run it on the default branch of your repository.

### It's hard to read

The script needs to generate many more commits than your busiest days to make a loud and clear statement.  The `$I` variable determines the number of commits.  If your graph does not turn a crisp, dark green "ABOLISH ICE,"" try increasing `$I`.

## Credit

Shadow forked from [rossabaker/abolish-ice-graphiti](https://github.com/rossabaker/abolish-ice-graphiti), which was bootstrapped from [github-graffiti](https://github.com/mavrk/github-graffiti).
