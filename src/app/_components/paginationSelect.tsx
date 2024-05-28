"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import useDebounceEffect from "~/customeHooks/useDebounceEffect";
import { filterOption } from "~/types/common";
import { ETMDBMoviesFilterParams } from "~/types/tmdbApi";
import { changeUrlParams } from "~/utils/helpers";

export interface PaginationProps {
  totalPages: number;
  totalPagesToDisplay?: number;
  currentPage: number;
}

export const PaginationComp: React.FC<PaginationProps> = ({
  totalPages,
  totalPagesToDisplay = 5,
  currentPage,
}: PaginationProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<filterOption<number | string>[]>([]);

  useEffect(() => {
    changeUrlParams<ETMDBMoviesFilterParams>(
      ETMDBMoviesFilterParams.page,
      selected,
      router,
    );
  }, [selected]);

  const showLeftEllipsis = currentPage - 1 > totalPagesToDisplay / 2;
  const showRightEllipsis =
    totalPages - currentPage + 1 > totalPagesToDisplay / 2;
  const getPageNumbers = () => {
    if (totalPages <= totalPagesToDisplay) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const half = Math.floor(totalPagesToDisplay / 2);
      // To ensure that the current page is always in the middle
      let start = currentPage - half;
      let end = currentPage + half;
      // If the current page is near the start
      if (start < 1) {
        start = 1;
        end = totalPagesToDisplay;
      }
      // If the current page is near the end
      if (end > totalPages) {
        start = totalPages - totalPagesToDisplay + 1;
        end = totalPages;
      }
      // If showLeftEllipsis is true, add an ellipsis before the start page
      if (showLeftEllipsis) {
        start++;
      }
      // If showRightEllipsis is true, add an ellipsis after the end page
      if (showRightEllipsis) {
        end--;
      }
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
  };

  const renderPaginationItems = () => {
    const pageNumbers = getPageNumbers();
    return pageNumbers.map((pageNumber) => (
      <PaginationItem key={pageNumber}>
        <PaginationLink
          className="cursor-pointer"
          isActive={pageNumber === currentPage}
          onClick={() =>
            setSelected([{ value: pageNumber, label: pageNumber.toString() }])
          }
        >
          {pageNumber}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className="cursor-pointer"
            onClick={() =>
              currentPage > 1 &&
              setSelected([
                { value: currentPage - 1, label: `${currentPage - 1}` },
              ])
            }
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {renderPaginationItems()}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className="cursor-pointer"
            onClick={() =>
              currentPage < totalPages &&
              setSelected([
                { value: currentPage + 1, label: `${currentPage + 1}` },
              ])
            }
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

// export function PaginationSelect({ filterParam , page , totalPages}) {
//   const router = useRouter();
//   const [pagesOptions,setPagesOptions] = useState<filterOption<number | string>[]>([])
//   const [selected, setSelected] = useState<filterOption<number | string>[]>([]);

//   useEffect(()=>{
//     if(page+1 <= totalPages){

//     }
//   },[])

//   useDebounceEffect(() => {
//     changeUrlParams<ETMDBMoviesFilterParams>(filterParam, selected, router);
//   }, [selected]);

//   return (
//     <Pagination>
//       <PaginationContent>
//         <PaginationItem>
//           <PaginationPrevious href="#" />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#">1</PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#" isActive>
//             2
//           </PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationLink href="#">3</PaginationLink>
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationEllipsis />
//         </PaginationItem>
//         <PaginationItem>
//           <PaginationNext href="#" />
//         </PaginationItem>
//       </PaginationContent>
//     </Pagination>
//   );
// }

// export default PaginationSelect;
