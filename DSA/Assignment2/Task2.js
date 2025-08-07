//finding if any item of the user roles exits in required roles

const requiredrole = (userroles,requiredroles)=>{
    const setrole = new Set(requiredroles);
    return userroles.some(role=>(setrole.has(role)))

}
const userRoles = ['user', 'editor'];
const requiredRoles = ['admin', 'editor'];
console.log( requiredrole(userRoles, requiredRoles)); 


