const { execSync } = require('child_process')

/**
 * confirms the current branch is in a good state for reset.
 * @param {*} defaultBranchName the name of the default branch
 */
function confirmDefaultBranchState(defaultBranchName) {
    let status = execSync('git status').toString()
    if (status.indexOf(defaultBranchName) == -1) {
        throw new Error(`you must be on the default branch. please run: \n\t'git checkout ${ defaultBranchName }'`)
    }
}

/**
 * calculates how many commits should be deleted from the default branch
 * @param {*} defaultBranchName the name of the default branch
 * @param {*} resetBranchName the name of the reset branch
 */
function getHowManyCommitsToDelete(defaultBranchName, resetBranchName) {
    let defaultBranchCommits, resetBranchCommits

    try {
        defaultBranchCommits = Number(execSync(`git rev-list --count ${ defaultBranchName }`).toString())
    } catch (e) {
        throw new Error(`could not find branch ${ defaultBranchName }`)
    }

    try {
        resetBranchCommits = Number(execSync(`git rev-list --count ${ resetBranchName }`).toString())
    } catch (e) {
        throw new Error(`could not find branch ${ resetBranchName }`)
    }

    let commitsToRemove = defaultBranchCommits - resetBranchCommits
    return commitsToRemove > 0 ? commitsToRemove : 0
}

/**
 * resets the default branch (deletes any commit beyond the ones counted in reset).
 * this is not super safe: it only checks commit counts.
 * a better way to do this might be deleting the main branch and then recreating from reset.
 * @param {*} defaultBranch the default branch name (abolish-ice if not specified)
 * @param {*} resetBranch the reset branch name (develop if not specified)
 */
function resetDefaultBranch(defaultBranch = 'abolish-ice', resetBranch = 'develop') {
    confirmDefaultBranchState(defaultBranch)

    let commitsToRemove = getHowManyCommitsToDelete(defaultBranch, resetBranch)
    console.log(`deleting ${ commitsToRemove } from branch ${ defaultBranch }...`)

    if (commitsToRemove > 0) {
        execSync(`git reset HEAD~${commitsToRemove}`)
        console.log('...finished! if you want to confirm, run\n\tgit rev-list --count HEAD\nor check the git log\n\tgit log')
    }
}

module.exports = { resetDefaultBranch }