export const getParams = (search) => {
  const removedQSearch = search.substring(1, search.length)
  const paramsArray = removedQSearch.split('&')
  const returnObject = {}
  paramsArray.forEach(string => {
    const split = string.split('=')
    returnObject[split[0]] = split[1]
  })
  return returnObject

}