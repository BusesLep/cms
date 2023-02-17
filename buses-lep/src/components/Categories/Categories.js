import React, { useState } from "react";
import useCategories from "../../hooks/useCategories";
import SanityImage from "gatsby-plugin-sanity-image";
import "./Categories.scss";
import Icon from "../Icons/Icon";
import useQuestions from "../../hooks/useQuestions";
import HelpCenter from "../HelpCenter/HelpCenter";
import TextField from "@mui/material/TextField";
import { StaticImage } from "gatsby-plugin-image";
import { useTheme } from "../../context/themeContext";

export default function Categories() {
  const { theme } = useTheme();
  const categories = useCategories().allSanityCategories.nodes;
  const questions = useQuestions().allSanityQuestion.nodes;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length >= 3) {
      search(e.target.value);
    } else {
      setFilteredQuestions([]);
    }
  };

  const search = (textSearch) => {
    let questionsList = questions.filter((question) => {
      let questionContent = question._rawAnswer
        .map((answer) => answer.children[0].text)
        .join(" ");

      return (
        question.question.toLowerCase().includes(textSearch.toLowerCase()) ||
        questionContent.toLowerCase().includes(textSearch.toLowerCase())
      );
    });
    setFilteredQuestions(questionsList);
  };

  const categoriesItems = categories.map((category) => {
    return (
      <div className="col-12 col-md-6 p-2">
        <a
          href={`/categories/${category.slug.current}`}
          className="categoryCard col-12 col-md-6"
        >
          <div className="categoryCard__content">
            <div className="categoryCard__image">
              <SanityImage
                {...category?.icon?.image}
                alt={`${category.title}`}
              />
            </div>
            <h5 className="py-0 m-0 title-small">{category.title}</h5>
          </div>

          <Icon code={"MdArrowForwardIos"} />
        </a>
      </div>
    );
  });

  return (
    <section className="helpCenter">
      <h3 className="py-1 mb-3">¿Cómo podemos ayudarte?</h3>
      <div className="inputContainer">
        <TextField
          label={
            searchQuery === ""
              ? "Escribe una palabra clave para buscar..."
              : " "
          }
          variant="standard"
          value={searchQuery}
          onChange={handleInputChange}
          InputLabelProps={{ shrink: false }}
          sx={{
            input: {
              color: theme === "dark" && "#ffffff",
            },
            ".css-v4u5dn-MuiInputBase-root-MuiInput-root:before": {
              borderBottom: theme === "dark" && "1px solid #ffffff",
            },
            label: {
              color: theme === "dark" && "#ffffff",
            },
          }}
        />
      </div>
      {searchQuery.length >= 3 && filteredQuestions.length === 0 && (
        <div className="d-flex flex-column align-items-center justify-content-end p-3 empty my-3">
          <StaticImage
            src="../../images/no-search.png"
            alt="no hay resultados"
          />
          <h5>No se encontraron resultados de búsqueda</h5>
        </div>
      )}
      {filteredQuestions.length > 0 && (
        <HelpCenter questions={filteredQuestions} type="searchResults" />
      )}
      {filteredQuestions.length > 0 && <h5>Busca por categorias:</h5>}
      <div className="categoriesContent">{categoriesItems}</div>
    </section>
  );
}
