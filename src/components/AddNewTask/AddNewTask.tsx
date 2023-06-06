import React, { useContext, useEffect, useRef } from "react";
import {
  Modal,
  NewBoardHeader,
  Lables,
  InputCont,
  BoardNameInp,
  ModalCOnt,
  ModalCols,
  ModalCol,
  AddBtn,
  SecondBtn,
} from "../AddNewBoard/NewBoardStyles/newBoardStyles";
import AppContext from "../../contexts/Header";
import {
  DescCont,
  Description,
  OptSelection,
  Options,
  SelectCont,
} from "./NewTaskStyles/newTask";
import cross from "../../assets/icon-cross.svg";
import MainContext, { Task } from "../../contexts/MainContext";


function AddNewTask() {
  const {
    isToggled,
    handleDeleteSubTasks,
    setSubTasks,
    subTasks,
    handleAddSubTask,
    setIsNewTask,
  } = useContext(AppContext);
  const {activeIndex } = useContext(MainContext);
  const { modifiedBoard, setModifiedBoard } = useContext(MainContext);
  //taking value and then makin sure that everything is valid then creating newTask also making sure index is not null
 
  const handleCreateTask = () => {
    const taskNameInput = document.querySelector(
      "#taskNameInput"
    ) as HTMLInputElement | null;
    const descriptionInput = document.querySelector(
      "#descriptionInput"
    ) as HTMLInputElement | null;
    const statusInput = document.querySelector(
      "#statusInput"
    ) as HTMLSelectElement | null;
    
    if (taskNameInput && descriptionInput && statusInput) {
      const newTask: Task = {
        title: taskNameInput.value || "",
        description: descriptionInput.value || "",
        status: statusInput.value || "",
        subtasks: subTasks.map((subTaskTitle) => ({
          title: subTaskTitle,
          isCompleted: false,
        })),
      };
  
      if (activeIndex !== null) {
        const selectedBoard = modifiedBoard[activeIndex];
       
        if (selectedBoard) {
          const columnIndex = selectedBoard.columns.findIndex(
            (column) => column.name === statusInput.value
          );
            console.log(columnIndex)
          if (columnIndex !== -1) {
            selectedBoard.columns[columnIndex].tasks.push(newTask);
          }
        }
      }
  
      setModifiedBoard([...modifiedBoard]);
  
      // Reset the form fields and subtasks
      taskNameInput.value = "";
      descriptionInput.value = "";
      statusInput.value = "Todo";
      setSubTasks([""]);
  
      setIsNewTask(false);
    }
  };

  return (
    <ModalCOnt>
      <Modal isToggled={isToggled}>
        <NewBoardHeader isToggled={isToggled}>
          Add New Task
          <img src={cross} alt="" onClick={() => setIsNewTask(false)} />
        </NewBoardHeader>
        <Lables isToggled={isToggled}>Task Name</Lables>
        <InputCont>
          <BoardNameInp
            id="taskNameInput"
            isToggled={isToggled}
            type="text"
          />
        </InputCont>
        <DescCont>
          <Lables isToggled={isToggled}>Description</Lables>
          <Description id="descriptionInput" isToggled={isToggled} />
        </DescCont>
        <Lables isToggled={isToggled}>SubTasks</Lables>
        <ModalCols>
          {subTasks.map((input, index) => (
            <ModalCol key={index}>
              <InputCont>
                <BoardNameInp
                  isToggled={isToggled}
                  key={index}
                  type="text"
                  value={input}
                  onChange={(e) => {
                    const newInputs = [...subTasks];
                    newInputs[index] = e.target.value;
                    setSubTasks(newInputs);
                  }}
                />
              </InputCont>
              <img src={cross} onClick={() => handleDeleteSubTasks(index)} />
            </ModalCol>
          ))}
          <AddBtn onClick={handleAddSubTask} isToggled={isToggled}>
            + Add SubTask
          </AddBtn>
        </ModalCols>
        <SelectCont>
          <Lables isToggled={isToggled}>Current Status</Lables>
          <Options isToggled={isToggled} id="statusInput">
            <OptSelection>Todo</OptSelection>
            <OptSelection>Doing</OptSelection>
            <OptSelection>Done</OptSelection>
          </Options>
        </SelectCont>
        <SecondBtn onClick={handleCreateTask}>Create Task</SecondBtn>
      </Modal>
    </ModalCOnt>
  );
}

export default AddNewTask;
