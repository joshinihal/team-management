import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";

import Table from "./ui/Table";
import AddMember from "./AddMember";
import Modal from "./ui/Modal";
import DropdownWithCheckbox from "./ui/DropdownWithCheckbox";

import { memberActions } from "../store/member";
import { filterActions } from "../store/filter";

const Home = () => {
  // get the member and filters data from redux
  const members = useSelector((state) => {
    return state.member.items;
  });

  const companyfilters = useSelector((state) => {
    return state.filter.companies;
  });

  const statusfilters = useSelector((state) => {
    return state.filter.statuses;
  });

  const [companies, setCompanies] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [showMemberForm, setShowMemberForm] = useState(false);

  const dispatch = useDispatch();

  const handleToggleMemberForm = () => {
    setShowMemberForm((prev) => !prev);
  };

  const handleMemberAdd = (member) => {
    handleToggleMemberForm();
    const date = new Date().toLocaleDateString("en-IN");
    const newMember = {
      name: member.enteredName,
      company: member.enteredCompany,
      status: member.enteredStatus,
      lastUpdated: date,
      notes: member.enteredNotes,
    };
    dispatch(memberActions.addMember(newMember));
  };

  const handleMemberDelete = (member) => {
    dispatch(memberActions.deleteMember(member));
  };

  const handleCompanyFilterChange = (changedFilters) => {
    dispatch(filterActions.addCompanyFilter(changedFilters));
  };

  const handleStatusFilterChange = (changedFilters) => {
    dispatch(filterActions.addStatusFilter(changedFilters));
  };

  useEffect(() => {
    const companiesList = [
      ...new Set(members.map((member) => member.company)),
    ].filter((each) => each.length);
    const statusList = [
      ...new Set(members.map((member) => member.status)),
    ].filter((each) => each.length);
    setCompanies(companiesList);
    setStatuses(statusList);
  }, [members]);

  useEffect(() => {
    const companyFiltersObj = {};
    const statusFiltersObj = {};

    companyfilters.forEach((filter) => {
      companyFiltersObj[filter] = 1;
    });

    statusfilters.forEach((filter) => {
      statusFiltersObj[filter] = 1;
    });

    setFilteredList((prev) => {
      const existingList = [...members];
      let newList = existingList;

      if (companyfilters.length) {
        newList = existingList.filter(
          (each) => each.company in companyFiltersObj
        );
      }

      if (statusfilters.length) {
        newList = newList.filter((each) => each.status in statusFiltersObj);
      }

      return newList;
    });
  }, [members, companyfilters, statusfilters]);

  return (
    <div>
      <header className={classes.header}>
        <h3>Team Members</h3>
        <div>
          <button
            className="blue-btn btn"
            type="button"
            onClick={handleToggleMemberForm}
          >
            Add Member
          </button>
        </div>
      </header>
      <hr></hr>

      <div className="home-body">
        <div className="filters">
          <DropdownWithCheckbox
            onOptionClick={handleCompanyFilterChange}
            label={"Filter by companies"}
            data={companies}
          />
          <DropdownWithCheckbox
            onOptionClick={handleStatusFilterChange}
            label={"Filter by status"}
            data={statuses}
          />
        </div>

        <Table onMemberDelete={handleMemberDelete} members={filteredList} />
        {showMemberForm ? (
          <Modal
            ModalOverlay={
              <AddMember
                onCancel={handleToggleMemberForm}
                onMemberAdd={handleMemberAdd}
              />
            }
            onModalClose={handleToggleMemberForm}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Home;
