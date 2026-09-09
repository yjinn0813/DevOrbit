import React, { useState } from "react";
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./../ui/input-group"

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) return;

    // TODO: GitHub 사용자 검색 로직
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup className={`bg-foreground ${className}`}>
        <InputGroupInput
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter a GitHub username"
        />

        <InputGroupAddon align="inline-end">
          <button type="submit" 
            aria-label="Search" 
            className="cursor-pointer transition-colors hover:text-primary"
          >
            <Search />
          </button>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
};

export default SearchBar;