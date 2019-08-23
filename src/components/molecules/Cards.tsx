import React, { FC, useState, useEffect } from 'react'
import Icon from '@material-ui/core/Icon'
import classNames from 'classnames'
import { Card as CardType } from '../../ducks/cards/types'
import Card from '../atoms/Card'
import './Cards.scss'

interface CardsProps {
  cards: CardType[]
}

const Cards: FC<CardsProps> = ({ cards }) => {

  const [ displayCards, setDisplayCards ] = useState<CardType[]>([])
  const [ isDisplayLeftLabel, setIsDisplayLeftLabel ] = useState(false)
  const [ isDisplayRightLabel, setIsDisplayRightLabel ] = useState(false)

  const swipeCard = (id: string) => {
    const card = displayCards.find(card => card.id === id)
    if (!card) return

    card.swiped = true

    const cards = displayCards.filter(card => !card.swiped)
    setTimeout(() => {
      setDisplayCards(cards)
    }, 250)
  }

  const setDisplayLabel = (direct: string) => {
    switch(direct) {
      case 'LEFT':
        setIsDisplayLeftLabel(true)
        setIsDisplayRightLabel(false)
        break
      case 'RIGHT':
        setIsDisplayRightLabel(true)
        setIsDisplayLeftLabel(false)
        break
      case 'HIDDEN':
        setIsDisplayRightLabel(false)
        setIsDisplayLeftLabel(false)
        break
    }
  }

  useEffect(() => {
    const displayCards = cards.slice(0, 10).map(card => Object.assign({}, card, { swiped: false }))
    setDisplayCards(displayCards)
  }, [cards])

  const leftLabelClassNames = classNames('label', 'skip', { 'isDisplay' : isDisplayLeftLabel })
  const rightLabelClassNames = classNames('label', 'read', { 'isDisplay' : isDisplayRightLabel })

  return (
    <div className="mainContainer">
      <div className="cardsContainer">
        <div className="cards">
          {
            displayCards.map(card => (
              <Card card={ card } key={ card.id } setDisplayLabel={ (direct) => setDisplayLabel(direct) } swipeCard={ (id: string) => swipeCard(id) } />
            ))
          }
        </div>
        <div className="labelContainer">
          <span className={leftLabelClassNames}>スキップ</span>
          <span className={rightLabelClassNames}>読む</span>
        </div>
      </div>
    </div>
  )
}

export default Cards