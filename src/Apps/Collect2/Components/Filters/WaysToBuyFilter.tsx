import { Box, Checkbox, Sans, Spacer } from "@artsy/palette"
import { FilterState, State } from "Apps/Collect2/Routes/Collect/FilterState"
import React from "react"

interface WayToBuy {
  disabled: any
  name: string
  state: keyof State
}

export const WaysToBuyFilter: React.FC<{
  filters: FilterState
}> = ({ filters }) => {
  const ways: WayToBuy[] = [
    {
      disabled: false,
      name: "Buy now",
      state: "acquireable",
    },
    {
      disabled: false,
      name: "Make offer",
      state: "offerable",
    },
    {
      disabled: filters.isRangeSelected("price_range"),
      name: "Bid",
      state: "at_auction",
    },
    {
      disabled: false,
      name: "Inquire",
      state: "inquireable_only",
    },
  ]

  const constructCheckboxes = () =>
    ways.map((way, index) => {
      const props = {
        disabled: way.disabled,
        key: index,
        onSelect: value => filters.setFilter(way.state, value),
        selected: filters.state[way.state],
      }

      return <Checkbox {...props}>{way.name}</Checkbox>
    })

  return (
    <Box pt={2}>
      <Sans size="2" weight="medium" color="black100">
        Ways to buy
      </Sans>
      <Spacer mb={2} />
      {constructCheckboxes()}
    </Box>
  )
}