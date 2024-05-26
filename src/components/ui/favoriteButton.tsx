"use client";

import FavIcon from "~/assets/icons/favIcon";
import { useOptimistic } from "react";

export const FavoriteButton = ({ favorited }: { favorited: boolean }) => {
  const [favoritedState, updateFavorited] = useOptimistic(
    favorited,
    // updateFn
    (currentState, optimisticValue: boolean) => optimisticValue,
  );

  return (
    <div className="absolute left-1 top-1  z-10 cursor-pointer">
      <button
        type="submit"
        onClick={() => {
          updateFavorited(!favorited);
        }}
      >
        <FavIcon
          width={60}
          style={{ fill: favoritedState ? "#9e214d" : "hsla(0, 0%, 34%, 0.7)" }}
        />
      </button>
    </div>
  );
};