import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./../ui/input-group"
import { toast } from 'sonner';

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className }: SearchBarProps) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername){
      toast.warning('Username is required!', {
        description: 'Please enter a GitHub username'
      });
      return;
    }
    
    navigate(`/detail/${trimmedUsername}`);
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