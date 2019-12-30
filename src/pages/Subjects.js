import React, {useState} from "react";
import {useSelector} from "react-redux";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";
import '../assets/css/pages/Subjects.scss'
import TopNav from "../components/includes/TopNav";
import Office from "../components/includes/Office";
import Sidebar from "../components/includes/Sidebar";
export default function Subjects(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [newSubjectModal, setNewSubjectModal] = useState(false);
  const [newCategoryModal, setNewCategoryModal] = useState(false);
  const categories = useSelector(state => state.remoteSubjectCategories);
  let subjectList;
  let categoryList;
  if (categories.data) {
    categoryList = categories.data.map(category => <option key={category.id} value={category.id}>{category.name}</option>);
    subjectList = <div className="subjects">
      {
        categories.data.map(category =>
          <div key={category.id}>
            <h2>{category.name}</h2>
            <ul>
              {
                category.subjects.map(subject =>

                  <li key={subject.id}>
                    <Link key={subject.id} className="subject" to={{
                      pathname: "/subject/"+subject.id,
                      state: {
                        subject: subject
                      }
                    }}>{subject.name}</Link>
                  </li>
                )
              }
            </ul>
          </div>
        )
      }
    </div>;
  }

  function submitSubject() {
    fetch('http://api.test/api/subjects', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      },
      body: JSON.stringify({
        name: name,
        description: description,
        category: (category ? category : categories.data[0].id)
      })
    })
  }

  function submitCategory() {
    fetch('http://api.test/api/subject-categories', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("tokens")).access_token,
      },
      body: JSON.stringify({
        name: categoryName
      })
    })
  }

  return(
    <div className="organization">
      <Sidebar/>
      <div className="main">
        <TopNav/>
        <div className="subjects-wrapper">
          <h2 className="title">Subjects</h2>
          <div className="wrapper">

            <div className="tools">
              <input placeholder="search on title"/>
              <button onClick={() => setNewSubjectModal(true)}>New</button>
              <button onClick={() => setNewCategoryModal(true)} className="category">Add Category</button>
            </div>

            {subjectList}

            <div className={'modal' + (newSubjectModal === true ? ' display': '')}>
              <div>
                <h2>Add</h2>
                <span onClick={() => setNewSubjectModal(false)}>
              <FontAwesomeIcon icon={faTimes} color="#939399"/>
            </span>
              </div>
              <label>Name</label>
              <input onChange={event => setName(event.target.value)}/>
              <label>Category</label>
              <select onChange={event => setCategory(event.target.value)}>
                {categoryList}
              </select>
              <label>Description</label>
              <textarea onChange={event => setDescription(event.target.value)}/>
              <button onClick={submitSubject}>Save</button>
            </div>

            <div className={'modal' + (newCategoryModal === true ? ' display': '')}>
              <div>
                <h2>Add</h2>
                <span onClick={() => setNewCategoryModal(false)}>
              <FontAwesomeIcon icon={faTimes} color="#939399"/>
            </span>
              </div>
              <label>Name</label>
              <input onChange={event => setCategoryName(event.target.value)}/>
              <button onClick={submitCategory}>Save</button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}