import React, { FC, useState } from "react"
import style from "./Paginator.module.css"
import back from "./../../style/back.png"
import forward from "./../../style/forward.png"
import { useEffect } from "react";

type propsType = {
  totalItemsCount: number
  pageSize: number
  onPageCanged: (page: number) => void
  currentPage: number
  portionSize?: number
  currentPortion: number
  setCurrentPortion: (portion: number) => void

}
const Paginator: FC<propsType> = ({ totalItemsCount, pageSize, currentPage, currentPortion, onPageCanged, setCurrentPortion, portionSize = 10 }) => {
  let pagesCount = Math.ceil(totalItemsCount / pageSize)
  // количество порций этих страничек
  let portionCount = Math.ceil(pagesCount / portionSize)
  // let [portionNumber, setPortionNumber] = useState<number>(currentPortion)

  let isShowLeft = currentPortion !== 0
  let isShowRight = portionCount !== currentPortion + 1
  const right = () => {
    setCurrentPortion(currentPortion + 1)
  }
  const left = () => {
    setCurrentPortion(currentPortion - 1)
  }
  useEffect(() => {
    // выполняется после отрисовки
    changePortion(changePortionPages())
  }, [currentPortion])

  const changePortionPages = (): Array<number> => {
    let test: Array<number> = []
    for (let i = 1; i <= portionSize; i++) {
      let passedItems = (i + (portionSize * currentPortion)) * pageSize
      let isAllShown = (passedItems - totalItemsCount) < pageSize
      if (isAllShown) {
        test.push(i + (portionSize * currentPortion))
      }
    }
    return test
  }
  let [pages, changePortion] = useState<Array<number>>(changePortionPages())

  function changePage(page: number) {
    onPageCanged(page)
  }
  const test = () => {
    setCurrentPortion(portionCount - 1)
    onPageCanged(pagesCount)

  }
  const test1 = () => {
    setCurrentPortion(0)
    onPageCanged(1)
  }
  return (<>
    {isShowLeft && <> <img src={back} alt="back" className={style.btn} onClick={left} />
      <span
        className={currentPage === 1 ? style.select : style.item}
        onClick={() => test1()}
      > {1}</span>----
    </>
    }
    {pages.map(p =>
      <span key={p}
        className={currentPage === p ? style.select : style.item}
        onClick={() => changePage(p)}
      > {p}</span>
    )}
    {isShowRight && <>
      ----
      <span
        className={currentPage === pagesCount ? style.select : style.item}
        onClick={() => test()}
      > {pagesCount}</span>
      <img src={forward} alt="back" className={style.btn} onClick={right} />

    </>
    }
    {/* <input type="number" onBlur={changePage()} val /> */}
  </>)
}

export default Paginator;
