export async function getImageLocation(animal: TynyfoxAnimal) {
  const response = await fetch(
    `https://api.tinyfox.dev/img?animal=${animal}&json`,
  )
  console.log('Got response')
  // console.log(response)
  // console.log(await response.text())
  const data: TinyfoxAPIResponse = await response.json()
  console.log('Got data')
  return `https://api.tinyfox.dev${data.loc}`
}

export async function getImage(animal: TynyfoxAnimal) {
  const loc = await getImageLocation(animal)
  const response = await fetch(loc)
  return response
}
