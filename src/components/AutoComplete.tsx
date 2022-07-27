import axios from "axios";
import { useEffect, useState } from "react";
import { Character, CharacterMod } from "../interfaces/characters";
import "./styles/AutoComplete.css";
export const AutoComplete = () => {
  //const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const [inputSearch, setInputSearch] = useState("");
  const [data, setData] = useState<Character[]>();
  const [matchedData, setMatchedData] = useState<CharacterMod[]>([]);
  useEffect(() => {
    axios.get<Character[]>("https://breakingbadapi.com/api/characters").then(
      (res) => {
        setData(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearch(e.target.value);
  };

  useEffect(() => {
    // creating the regex expression by the input value
    var reg = "(" + inputSearch + ")(?![^<]*>|[^<>]*</)";
    var regex = new RegExp(reg, "i");

    // creating the array of matched data
    let newData = data?.filter((character) => {
      return character.name.match(regex);
    });

    // mapping the filtered array and adding the pice of the matched data in a new property "match" wrapped in between a <strong> tag
    newData = newData?.map((character) => {
      const remplacedTag: HTMLElement = document.createElement("strong");
      remplacedTag.className = "matchedString";
      remplacedTag.innerHTML = "$1";
      return {
        ...character,
        match: character.name.replace(regex, remplacedTag.outerHTML),
      };
    });

    setMatchedData(newData as CharacterMod[]);
  }, [inputSearch, data]);

  return (
    <div className="auto-complete">
      <div className="auto-complete__title">
        <label htmlFor="data">Autocomplete</label>
        <input
          value={inputSearch}
          onChange={(e) => handleInputChange(e)}
          type="text"
          id="data"
          name="dataItems"
        />
      </div>

      {matchedData && matchedData.length > 0 ? (
        matchedData.map((item) => (
          <p
            key={item.char_id}
            dangerouslySetInnerHTML={{
              __html: item.match,
            }}
          ></p>
        ))
      ) : (
        <p className="not-found">No match found :/</p>
      )}
    </div>
  );
};