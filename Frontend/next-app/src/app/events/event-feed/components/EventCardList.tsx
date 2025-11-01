// // From https://blog.devops.dev/implementing-infinite-scroll-in-next-js-a-complete-guide-0ce74d5eb57d

"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { EventInformation } from "./EventCard";
import EventCardGroups, { getEventCardGroups } from "./EventCardGroups";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface InfiniteScrollProps {
  initialGroups: EventInformation[][];
  initialPage: number;
  limit: number;
  totalItems: number;
}

/**
 * @param {EventInformation} intitialGroups - A list of {limit} number of groups that are intially loaded on this page
 * @param {number} initialPage - The initial offset, typically zero
 * @param {limit} - The number of EventInformation groups being fetched
 * @param {number} totalItems - The total number of event groups that can be fetched
 *
 * @returns The component containing all the event cards, with infinite scrolling
 */
export default function EventCardList({
  initialGroups,
  initialPage,
  limit,
  totalItems,
}: InfiniteScrollProps) {
  /**
   * @state {EventInformation} items - The current rendered list of event groups fetched.
   * @state {number} page - The current page number that has been rendered up to
   * @state {boolean} loading - Indicates when the page is loading more events from the infinite scroll
   * @state {boolean} hasMore - Indicates whether more event groups can be fetched
   * @state {string} error - The error message
   */
  const [items, setItems] = useState<EventInformation[][]>(initialGroups);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(
    totalItems > initialGroups.length * limit
  );
  const [error, setError] = useState("");

  // The observer will be attached to this element
  const observerTarget = useRef<HTMLDivElement>(null);
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / limit);

  // Reset state when initial props change (when navigating back)
  useEffect(() => {
    setItems(initialGroups);
    setPage(initialPage);
    setHasMore(totalItems > initialGroups.length * limit);
    setError("");
  }, [initialGroups, initialPage, totalItems, limit]);

  // Memoize loadMoreItems to prevent recreation on every render
  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError("");
    const nextPage = page + 1;

    try {
      const result = await getEventCardGroups(nextPage, limit);

      if (!result || result.length === 0) {
        setHasMore(false);
        setError("No more items to load");
      } else {
        setItems((prevItems) => [...prevItems, ...result]);
        setPage(nextPage);

        // Check if all events have been fetched
        const totalLoaded = nextPage * limit;
        if (totalLoaded >= totalItems) {
          setHasMore(false);
        }
      }
    } catch (err) {
      setError("Failed to load more items. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, limit, totalItems]);

  // Setup intersection observer
  useEffect(() => {
    const currentTarget = observerTarget.current;
    if (!currentTarget || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(currentTarget);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, loadMoreItems]);

  return (
    <>
      {/* Error message if any */}
      {error && <p className="text-red-500 text-center my-4">{error}</p>}

      {/* Event Card list */}
      <div className="flex flex-col gap-5 my-5">
        {items.map((events, index) => (
          <EventCardGroups
            key={`${index}-${events[0]?.eventID || index}`}
            events={events}
          />
        ))}
      </div>

      {/* Loading indicator and observer target */}
      <div
        ref={observerTarget}
        className="infinite-scroll-trigger h-20 flex items-center justify-center mt-8"
      >
        {loading && (
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900">
            <AiOutlineLoading3Quarters />
          </div>
        )}
      </div>

      {/* End message */}
      {!hasMore && items.length > 0 && (
        <p className="text-center text-gray-500 my-4">You've reached the end</p>
      )}
    </>
  );
}
