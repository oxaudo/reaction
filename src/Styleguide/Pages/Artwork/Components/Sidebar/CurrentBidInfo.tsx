import { Serif } from "@artsy/palette"
import { Sans } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"

import { CurrentBidInfo_artwork } from "__generated__/CurrentBidInfo_artwork.graphql"

export interface CurrentBidinfoProps {
  artwork: CurrentBidInfo_artwork
}

const CurrentBidInfoContainer = Box

export class CurrentBidInfo extends React.Component<CurrentBidinfoProps> {
  render() {
    const { artwork } = this.props
    if (artwork.sale && artwork.sale.is_closed) {
      return (
        <CurrentBidInfoContainer pb={2}>
          <Serif size="5t" weight="semibold" color="black100">
            Bidding closed
          </Serif>
        </CurrentBidInfoContainer>
      )
    }
    const bidsPresent = artwork.sale_artwork.counts.bidder_positions > 0
    const bidPrompt = bidsPresent ? "Current bid" : "Starting Bid"
    const bidColor =
      artwork.sale_artwork.is_with_reserve &&
      bidsPresent &&
      artwork.sale_artwork.reserve_status === "reserve_not_met"
        ? "red100"
        : "black60"
    let bidTextParts = []
    if (bidsPresent) {
      bidTextParts.push(
        artwork.sale_artwork.counts.bidder_positions === 1
          ? "1 bid"
          : artwork.sale_artwork.counts.bidder_positions + " bids"
      )
    }
    artwork.sale_artwork.reserve_message &&
      bidTextParts.push(artwork.sale_artwork.reserve_message)
    const bidText = bidTextParts.join(", ")
    return (
      <CurrentBidInfoContainer pb={2}>
        <Flex width="100%" flexDirection="row" justifyContent="space-between">
          <Serif size="5t" weight="semibold" pr={1}>
            {bidPrompt}
          </Serif>
          <Serif size="5t" weight="semibold" pl={0.5}>
            {artwork.sale_artwork.current_bid.display}
          </Serif>
        </Flex>
        <Flex width="100%" flexDirection="row" justifyContent="space-between">
          <Sans size="2" color={bidColor} pr={1}>
            {bidText}
          </Sans>
        </Flex>
      </CurrentBidInfoContainer>
    )
  }
}

export const CurrentBidInfoFragmentContainer = createFragmentContainer(
  CurrentBidInfo,
  graphql`
    fragment CurrentBidInfo_artwork on Artwork {
      sale {
        is_open
        is_closed
      }
      sale_artwork {
        lot_label
        estimate
        is_with_reserve
        reserve_message
        reserve_status
        current_bid {
          display
        }
        counts {
          bidder_positions
        }
      }
    }
  `
)
