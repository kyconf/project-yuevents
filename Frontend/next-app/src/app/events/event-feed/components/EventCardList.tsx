// From https://blog.devops.dev/implementing-infinite-scroll-in-next-js-a-complete-guide-0ce74d5eb57d
"use client";

import { useEffect, useRef, useState } from "react";
import { EventInformation } from "./EventCard";
import EventCardGroups, { getEventCardGroups } from "./EventCardGroups";

interface InfiniteScrollProps {
  initialGroups: EventInformation[][];
  initialPage: number;
  limit: number;
  totalItems: number;
}

export default function EventCardList({
  initialGroups,
  initialPage,
  limit,
  totalItems,
}: InfiniteScrollProps) {
  const [items, setItems] = useState<EventInformation[][]>(initialGroups);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(totalItems > initialGroups.length);
  const [error, setError] = useState("");

  // The observer will be attached to this element
  const observerTarget = useRef<HTMLDivElement>(null);

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / limit);
  // Fetch more items function
  const loadMoreItems = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const result = await getEventCardGroups(nextPage, limit);
      if (!result) {
        setError("Error");
      } else if (page < totalPages) {
        setItems((prevItems) => [...prevItems, ...result]);
        setPage(nextPage);
        console.log(page);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      setError("Failed to load more items. Please try again later.");
      console.error("Error in client component:", err);
    } finally {
      setLoading(false);
    }
  };
  // Setup the intersection observer
  useEffect(() => {
    if (!observerTarget.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(observerTarget.current);

    // Cleanup observer on unmount
    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, page]);

  return (
    <>
      {/* Error message if any */}
      {error && <p className="text-red-500 text-center my-4">{error}</p>}

      {/* Event Card list */}
      <div className="flex flex-col gap-5 my-5">
        {items.map((events, index) => (
          <EventCardGroups key={index} events={events} />
        ))}
      </div>

      {/* Loading indicator and observer target */}
      <div
        ref={observerTarget}
        className="infinite-scroll-trigger h-20 flex items-center justify-center mt-8"
      >
        {loading && (
          <div className="loading-spinner animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        )}
      </div>

      {/* End message */}
      {!hasMore && items.length > 0 && (
        <p className="text-center text-gray-500 my-4">You've reached the end</p>
      )}
    </>
  );
}
