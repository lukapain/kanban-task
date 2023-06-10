import React, { useContext, useState } from 'react'
import { HeaderCont,Imgs,HeaderName,AddBtn,VerticalImg, LogoCont, ProjectName, ImgsPlus,AddNewTasks } from './HeaderStyles/headerStyle'
import logo from '../../assets/logo-mobile.svg'
import ArrowDOwn from '../../assets/icon-chevron-down.svg'
import ArrowUp from '../../assets/icon-chevron-up.svg'
import AddTask from '../../assets/icon-add-task-mobile.svg'
import ThreeDots from '../../assets/icon-vertical-ellipsis.svg'
import AppContext from '../../contexts/Header'
import NavModal from '../NavModal/NavModal'
import AddNewBoard from '../AddNewBoard/AddNewBoard'
import AddNewTask from '../AddNewTask/AddNewTask'
import MainPage from '../Main/MainPage'
import Data from '../../data.json'
import MainContext from '../../contexts/MainContext'
import Elapsis from '../Elapsis-menu/Elapsis'
import EditBoard from '../EditBoard/EditBoard'
import DelateMOdal from '../DelateModal/DelateMOdal'
import AboutModal from '../AboutModal/AboutModal'
import TaskDElateElapsis from '../TaskDelateElapsis/TaskDElateElapsis'
import TaskDelateModal from '../TaskDelateModal/TaskDelateModal'
function Header() {
   const {toggleOpen,isOpen,isToggled,isOpenAddModal,handleTaskModal,isNewTask,isSmallModalOpen,setIsSmallModalOpen} = useContext(AppContext)
   const {selectedPlatform,editModal,delateISopen,isOpenAboutModal,isOpenTaskDel} = useContext(MainContext)
  return (
    <>
   <HeaderCont isToggled={isToggled}>
    <LogoCont>
    <Imgs src={logo}/>
    <ProjectName>Kanban</ProjectName>
    </LogoCont>
    
    <HeaderName isToggled={isToggled}>
    <h3>{selectedPlatform}</h3>
    <img onClick={toggleOpen} src={isOpen ?ArrowUp : ArrowDOwn} alt="" />
    </HeaderName>
    <AddBtn><ImgsPlus  src={AddTask} alt="" onClick={handleTaskModal} />  <AddNewTasks> +Add New Task</AddNewTasks></AddBtn>
    <VerticalImg src={ThreeDots} onClick={() => setIsSmallModalOpen(!isSmallModalOpen)} alt="" />
    {isOpen && (
    <NavModal/>
   )}
   {isOpenAddModal && (
    <AddNewBoard/>
   )}
   {isSmallModalOpen && (
 <Elapsis/>
   )}
   
   </HeaderCont>
   
   {isNewTask && (
    <AddNewTask/>
   )}
   {editModal && (
   <EditBoard/>
   )}
   {delateISopen && (
    <DelateMOdal/>
   )}
  {isOpenAboutModal && (
    <AboutModal/>
  )}
 {isOpenTaskDel && (
  <TaskDelateModal/>
 )}
  
  <MainPage/>
  
   </>
  )
}

export default Header