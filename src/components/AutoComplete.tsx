import axios from "axios";
import { useEffect, useState } from "react";
import { Character, CharacterMod } from "../interfaces/characters";
import "./styles/AutoComplete.css";
export const AutoComplete = () => {
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
    searchMatchedData(data || [], inputSearch);
  }, [inputSearch, data]);

  const searchMatchedData = async (data: Character[], inputSearch: string) => {
    // creating the regex expression by the input value

    //wrapper the below code in a promise with a delay of 500ms
    const result = new Promise<CharacterMod[]>((resolve) => {
      setTimeout(() => {
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

        resolve(newData as CharacterMod[]);
      }, 500);
    });

    const newData = await result; // NOTE: if this was a real promise (with api call) we would save the promise in a variable and try/catch, also clean the prevous promise if it was already running to not execute it twice or more.. only call the most resent promise
    setMatchedData(newData as CharacterMod[]);
  };

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
