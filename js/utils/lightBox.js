function showModal(modalElement) {
  const modal = new window.bootstrap.Modal(modalElement)
  if (modal) modal.show()
}

export function registerLightbox({ modalId, imgSelector, prevSelector, nextSelector }) {
  const modalElement = document.getElementById(modalId)
  if (!modalElement) return

  //check if this modal is registered or not
  if (Boolean(modalElement.dataset.registered)) return

  //selectors
  const imgElement = modalElement.querySelector(imgSelector)
  const prevButton = modalElement.querySelector(prevSelector)
  const NextButton = modalElement.querySelector(nextSelector)
  if (!imgElement || !prevButton || !NextButton) return

  //lightbox vars
  let imgList = []
  let currentIndex = 0

  function showImageAtIndex(index) {
    imgElement.src = imgList[index].src
  }

  // handle click for all imgs -> Event delegation
  document.addEventListener('click', (event) => {
    const { target } = event

    if (target.tagName !== 'IMG' || !target.dataset.album) return

    //img with data-album
    imgList = document.querySelectorAll(`img[data-album="${target.dataset.album}"]`)
    currentIndex = [...imgList].findIndex((x) => x === target)
    console.log('album image click', target.tagName, ', index =', currentIndex, imgList)

    showImageAtIndex(currentIndex)
    showModal(modalElement)
  })

  prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imgList.length) % imgList.length
    showImageAtIndex(currentIndex)
  })

  NextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imgList.length
    showImageAtIndex(currentIndex)
  })

  modalElement.dataset.registered = 'true'
}
