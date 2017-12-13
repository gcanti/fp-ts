const replicateUntil = (arr, nbElem) => {
  const res = []
  let nb = 0
  while (nb < nbElem) {
    res.push(...arr)
    nb += arr.length
  }
  return res.slice(0, nbElem)
}

module.exports.replicateUntil = replicateUntil
