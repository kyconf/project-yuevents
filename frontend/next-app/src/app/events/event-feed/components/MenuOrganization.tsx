"use client";

import React, { useEffect, useState } from "react";
import MenuTemplate from "./MenuTemplate";

/**
 * @returns The input field for registered organizations
 */
export default function MenuOrganization() {
  const title = "Organizations";
  const [dropDownItems, setDropDownItems] = useState<string[]>([]);
  const [ids, setIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:8000/clubs");
        const result = await response.json();

        if (response.ok && Array.isArray(result)) {
          const names = result.map((org) => org.name);
          const orgIds = result.map((org) => org.id);

          setDropDownItems(names);
          setIds(orgIds);
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <MenuTemplate
      buttonText={title}
      children={dropDownItems}
      ids={ids}
      queryParam="club_id"
      menuType="check"
    />
  );
}
