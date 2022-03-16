let serialNo = 0;


// genrating a uniq id 

let ID = function(){
    
    return '_' + Math.random().toString(36).substr(2, 9)
}


class Task {
    constructor(date,workarea,details,id){
            // this.serialNo = serialNo;    
            this.date = date;
            this.workarea = workarea;
            this.details = details;
            this.id = id;

    }
}


class UI {
   

            addItemToList(task) {

                serialNo = serialNo + 1;
                const list = document.querySelector('#table-body');
                const row = document.createElement('tr');
                row.classList = 'bg-gray-100 border-b border-gray-200';
                row.innerHTML = 
                `
                <td class="px-4 py-3">${serialNo}</td>
                <td class="px-4 py-3">${task.date}</td>
                 <td class="px-4 py-3">${task.workarea}</td>
                <td class="px-4 py-3">${task.details}</td>
                <td class="px-4 py-3" style="display: none;" >${task.id}</td>
                <td class="px-4 py-3"><ion-icon name="close-circle-outline" class="cursor-pointer delete-item "></ion-icon></td>
                `
                list.appendChild(row)

            }

            showalret(){
                    document.getElementById('alert').style.display = 'flex'
            }
            showSucess(){
                document.getElementById('sucess').style.display =' flex'
            }

            deleteTask(target){
                if(target.classList.contains('delete-item')){
                    target.parentElement.parentElement.remove();
                }


            }
            clearFieds(){


                    document.querySelector('#date-input').value = ''
                    document.querySelector('#text-area').value = ''
                    document.querySelector('#dropdown').value = 'choose ...'



            }


    }

class Store {
        static getTask(){
            let tasks;
            if(localStorage.getItem('tasks') === null){
                tasks = [];
            }else{
                tasks = JSON.parse(localStorage.getItem('tasks'))
            }

            return tasks

        }
        static displayTask(){
            const tasks = Store.getTask();

            tasks.forEach(function(task){
                    const ui = new UI;
                    ui.addItemToList(task)
            })

        }
        static addTask(task){
            const tasks = Store.getTask();
                const OBJ = {
                    ...task,

                } 
            tasks.push(OBJ);

            localStorage.setItem('tasks',JSON.stringify(tasks))

        }
        static removeTask(id){
            const tasks = Store.getTask();

            tasks.forEach(function(task,index){
                if( id === task.id){

                    tasks.splice(index, 1)
                }
                
        })

            // console.log(tasks);
            localStorage.setItem('tasks',JSON.stringify(tasks))
 

        }
        


}

// DOM load Event 

document.addEventListener('DOMContentLoaded',Store.displayTask)


document.querySelector('#submitBtn').addEventListener('click',function(e){

            const getDate = document.querySelector('#date-input').value;
            const taskArea = document.querySelector('#dropdown').value;
            const details = document.querySelector('#text-area').value;
            const id = ID()
            // const serialNum = serialNo += 1


            const task = new Task(getDate,taskArea,details,id);

            const ui = new UI();

            e.preventDefault()

            if(getDate === '' || taskArea === 'choose ...' || details === '' ){
                    ui.showalret()
            }else{
                ui.addItemToList(task)
                ui.clearFieds()
                ui.showSucess()
                

                // Add to LS

                Store.addTask(task)

            }

            setTimeout(() => {

                document.getElementById('alert').style.display = 'none';
                document.getElementById('sucess').style.display ='none';


                
            }, 3000);

})

document.querySelector('#table-body').addEventListener('click',function(e){

        const ui = new UI();
        
        ui.deleteTask(e.target)

        // remve from ls 

        Store.removeTask(e.target.parentElement.previousElementSibling.textContent);

})
