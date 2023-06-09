import React, { useContext, useState } from 'react';
import {
  Board,
  Cols,
  ColName,
  Task,
  TaskTitle,
  NumOfSubTAsks,
  AddNewCol,
} from './MainPAgeStyles/mainPage';
import Data from '../../data.json';
import MainContext, { BoardData } from '../../contexts/MainContext';
import AppContext from '../../contexts/Header';




const MainPage: React.FC = () => {
  const { board,modifiedBoard,setModifiedBoard,EdiModalOpen,setSelectedTask,setIsOpenAboutModal,isOpenAboutModal } = useContext(MainContext);
 
  
  const { isToggled } = useContext(AppContext);
  if (!board) return null;

 const handleOpenSpecificTask = (task:any) => {
  setSelectedTask(task);
  console.log('clicked ' , task)
  setIsOpenAboutModal(!isOpenAboutModal)
 }


  return (
    <div>
      <Board key={board.name} isToggled={isToggled}>
        {board.columns.map((column) => (
          <Cols key={column.name}>
            <ColName>{column.name}</ColName>
            
            {column.tasks.map((task) => (
              <Task key={task.title} isToggled={isToggled} draggable  onClick={() => handleOpenSpecificTask(task)}>
                <TaskTitle isToggled={isToggled}>{task.title}</TaskTitle>
                <NumOfSubTAsks>
                  {task.subtasks.filter((subtask) => !subtask.isCompleted).length} of {task.subtasks.length} subtasks
                </NumOfSubTAsks>
              </Task>
            ))}
          </Cols>
        ))}
        
          <AddNewCol isToggled={isToggled} onClick={EdiModalOpen} >+ new column</AddNewCol>
         
      </Board>
    </div>
  );
};

export default MainPage;
