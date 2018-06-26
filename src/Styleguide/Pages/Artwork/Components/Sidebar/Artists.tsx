import { Serif } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { FollowIcon } from "Styleguide/Elements/FollowIcon"

import { Artists_artwork } from "__generated__/Artists_artwork.graphql"

export interface ArtistsProps {
  artwork: Artists_artwork
}

type Artist = Artists_artwork["artists"][0]

const ArtistsContainer = Box

export class Artists extends React.Component<ArtistsProps> {
  renderArtistName(artist: Artist) {
    return artist.href ? (
      <Serif size="5t" display="inline-block" weight="semibold">
        <a href={artist.href}>{artist.name}</a>
      </Serif>
    ) : (
      <Serif size="5t" display="inline-block" weight="semibold">
        {artist.name}
      </Serif>
    )
  }

  renderSingleArtist(artist: Artist) {
    return (
      <React.Fragment>
        {this.renderArtistName(artist)}
        <FollowIcon is_followed={artist.is_followed} />
      </React.Fragment>
    )
  }

  renderMultipleArtists() {
    const {
      artwork: { artists },
    } = this.props
    return artists.map((artist, index) => {
      return (
        <React.Fragment key={artist.__id}>
          {this.renderArtistName(artist)}
          {index !== artists.length - 1 && ", "}
        </React.Fragment>
      )
    })
  }

  render() {
    const {
      artwork: { artists },
    } = this.props
    return (
      <ArtistsContainer pb={2}>
        {artists.length === 1
          ? this.renderSingleArtist(artists[0])
          : this.renderMultipleArtists()}
      </ArtistsContainer>
    )
  }
}

export const ArtistsFragmentContainer = createFragmentContainer(
  Artists,
  graphql`
    fragment Artists_artwork on Artwork {
      artists {
        __id
        id
        name
        is_followed
        href
      }
    }
  `
)
