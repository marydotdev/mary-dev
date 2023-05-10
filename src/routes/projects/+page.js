/** @type {import('./$types').PageLoad} */
export async function load({fetch}) {
  const res = await fetch('https://api.github.com/users/marydotdev/repos')
  const repos = res.json();

  return {
    repos
  }

}
