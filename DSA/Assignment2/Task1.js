//Finding duplicate in the list of arrays

const duplicate=(arr)=>{
   const org = new Set()
   const duplicates = new Set()

   for(let value of arr){
    if(org.has(value)){
        duplicates.add(value)

    }else{
        org.add(value)
    }
   }
   return[...duplicates]
}

const numbers = [1,2,4,4,5,6,6,12,12,12,9]
console.log(duplicate(numbers))