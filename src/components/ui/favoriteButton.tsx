"use client";

import FavIcon from "~/assets/icons/favIcon";
import { useState } from "react";
import { updateFavorites } from "~/server/queries/favorites";
import { useDebounceAction } from "~/customeHooks/UseDebounceAction";

export const FavoriteButton = ({
  favorited,
  tmdbId,
}: {
  favorited: boolean;
  tmdbId: number;
}) => {
  const [favoritedState, updateFavorited] = useState(favorited);

  const debouncedFavorite = useDebounceAction(() => {
    updateFavorites(!favoritedState, tmdbId, "movie");
  });

  return (
    <div className="absolute left-1 top-1  z-10 cursor-pointer" key={tmdbId}>
      <button
        onClick={() => {
          updateFavorited(!favoritedState);
          debouncedFavorite();
        }}
      >
        <FavIcon
          key={tmdbId}
          width={60}
          style={{
            fill: favoritedState ? "#9e214d" : "hsla(0, 0%, 34%, 0.7)",
          }}
        />
      </button>
    </div>
  );
};
