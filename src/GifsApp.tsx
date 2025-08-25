import { GifList } from "./gifs/components/GifList";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { useGifs } from "./gifs/hooks/useGifs";
import { CustomHeader } from "./shared/components/CustomHeader";
import { SearchBar } from "./shared/components/SearchBar";

export const GifsApp = () => {
  const { handleSearch, handleTermClicked, previousTerms, gifs } = useGifs();

  return (
    <>
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      <SearchBar
        placeholder="Buscar gifs"
        textButton="Buscar"
        onQuery={handleSearch}
      />

      <PreviousSearches
        title="Búsquedas previas"
        searches={previousTerms}
        onLabelClicked={handleTermClicked}
      />

      <GifList gifs={gifs} />
    </>
  );
};
