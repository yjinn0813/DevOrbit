import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "./../ui/input-group"

const SearchBar = () => {
  return (
    <InputGroup className="bg-foreground max-w-3xs">
      <InputGroupInput placeholder="Search GitHub Users" />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end"></InputGroupAddon>
    </InputGroup>
  )
}

export default SearchBar