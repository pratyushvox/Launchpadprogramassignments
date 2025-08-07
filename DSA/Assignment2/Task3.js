//Finding common elements between arrays 

const commonelement=(arr1,arr2)=>{
    const set1 = new Set(arr1)
    const obtained_result=[]

    for (let value of arr2){
        if(set1.has(value)){
            obtained_result.push(value)
        }
       

    }
    return obtained_result
    

}
const arr1 = [1,5,6,7,3,2]
const arr2 = [4,5,6,2,3,1]
console.log(commonelement(arr1,arr2))
