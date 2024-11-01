class PCB {
    constructor(arrTime, exeTime, processId, processState) {
      this.arrTime = arrTime
      this.exeTime = exeTime
      this.startTime = -1
      this.finishTime= "calculating..."
      this.TAtime = "calculating...";
      this.waitTime= 0;
      this.utilization= "calculating...";
      this.processId = processId
      this.PC = 1
      this.IR = 1
      this.processState = processState
    }
  }

  let totalExeTime=0;
  const n = Number(prompt("How many processes?"))
  const PCBs = []

  let Processes=[];
  for(i=0;i<n;i++){
      let et= Number (prompt(`Enter the execution time of process ${i+1}`));
      totalExeTime+=et;
      Processes[i]= new Array(et);
      for(j=0;j<et;j++){
          Processes[i][j]=`Instruction ${j+1}`;
      }
      const pcb = new PCB(i, Processes[i].length, i+1, "readyQueue")
    PCBs.push(pcb);

  }
  let quantum = Number (prompt("Enter the Quantum size in which all the processes should work: "));

  console.log(Processes);
  console.log(PCBs);

  console.log(totalExeTime);

  let counter=1;
  let p=0;
  let count=0;

while (counter <= totalExeTime) {

    if (p === n) {
        p = 0;
    }

    if (PCBs[p].IR <= Processes[p].length) {

        if (PCBs[p].startTime === -1) {
            PCBs[p].startTime = counter - 1;
        }
       
        if(PCBs[p].IR === Processes[p].length){
            PCBs[p].finishTime=counter;
            PCBs[p].TAtime= PCBs[p].finishTime- PCBs[p].arrTime;
            PCBs[p].utilization= PCBs[p].exeTime / PCBs[p].TAtime;
            PCBs[p].utilization= parseFloat(PCBs[p].utilization.toFixed(2));
        }

        count++;
        PCBs[p].IR += 1;
        PCBs[p].waitTime=PCBs[p].startTime-PCBs[p].arrTime;

        console.log(`Program Control Block of Process: ${PCBs[p].processId}`);
        console.log('-----------------------------------------');
        console.log(`Arrival Time : ${PCBs[p].arrTime} quantum`);
        console.log(`Execution Time : ${PCBs[p].exeTime} quantums`);
        console.log(`Start Time : ${PCBs[p].startTime} quantum`);
        console.log(`Finish Time : ${PCBs[p].finishTime} quantum`);
        console.log(`Turn around Time : ${PCBs[p].TAtime} quantums`);
        console.log(`Wait Time : ${PCBs[p].waitTime} quantums`);
        console.log(`Utilization : ${PCBs[p].utilization}`);
        if(PCBs[p].processId +1 <= n){
           console.log(`Program Counter (PC) : Starting address of Process: ${PCBs[p].processId +1}`);
        }
        else{
            // if(PCBs[0].IR === Processes[p].length +1){
            //     console.log(`Program Counter (PC) : All Processes completely executed!`);
            // }
            // else{
            console.log(`Program Counter (PC) : Starting address of Process 1`);
            
        }
        if(PCBs[p].IR === Processes[p].length +1){
            PCBs[p].IR="Process completely executed!";
            console.log(`Information Register (IR) : ${PCBs[p].IR}`);
            }
                else{
        console.log(`Information Register (IR) : Instruction no:${PCBs[p].IR}`);
            }
        console.log(`Process State: ${PCBs[p].processState}`);

        // Move to the next process after the quantum has been reached , kya samjhy?
        if (count === quantum) {
            count = 0;  // Reset count
            p++;        // Move to the next process
        }
    }
      else {
        p++; 
        counter--; // Move to the next process if current process is done , set vro?
    }

     counter++;  // Ensure counter increments every iteration! got it vro?
} 
 






