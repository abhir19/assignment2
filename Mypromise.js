class MyPromise{
    constructor(main) {
        this.status = "pending";
        this.value = undefined;
      
        this.resolveArr = [];
      
        this.rejectArr = [];
        
        
       
        let change = (status, value) => {
            if(this.status !== "pending") return;
            this.status = status;
            this.value = value;
            
            let Arr = status === "resolved" ? this.resolveArr : this.rejectArr;
            
       
            Arr.forEach(item => {
                if(typeof item !== "function") return;
                item(this. value);
            })
        }
        
        let resolve = result => {
            change("resolved", result)
        }
  
        let reject = reason => {
            change("rejected", reason);
        }
        
        try {
            main(resolve, reject)
        } catch(err) {
            reject(err)
        }
    }
  
    catch(rejectFn) {
        return this.then(null, rejectFn)
    }   
  
  
    then(resolveFn, rejectFn) {

    
        if(typeof resolveFn !== "function") {
            resolveFn = result => {
                return result;
            }
        }
        
        if(typeof rejectFn !== "function") {
            rejectFn = reason => {
                return MyPromise.reject(reason);
            }
        }
        
        return new MyPromise((resolve, reject) => {
            this.resolveArr.push(result => {
                try {
                   
                    let x = resolveFn(result);
                    
                  
                    if(x instanceof MyPromise) {
                        x.then(resolve, reject)
                        return;
                    }
                    
                    resolve(x);
                } catch(err) {
                    reject(err)
                }
            })
            
            this.rejectArr.push(reason => {
                try {
                    let x = rejectFn(reason);
                    
                    if(x instanceof MyPromise) {
                        x.then(resolve, reject)
                        return;
                    }
                    
                    resolve(x);
                } catch(err) {
                    reject(err)
                }
            })
        })
    }
  
    finally(finallyFn) {
        let P = this.constructor;
        return this.then(
            value => P.resolve(finallyFn()).then(() => value),
            reason => P.reject(finallyFn()).then(() => reason)
        )
    }
  
    static resolve(result) {
         return new MyPromise(resolve => {
             resolve(result)
         })
    }
  
    static reject(reason) {
        return new MyPromise((_, reject) => {
            reject(reason);
        })
    }
  }
  
  
  //example no-1
  
  ///////////////////////,
  // const obj= new MyPromise((resolve,reject)=>{
  //   let rollno=[1,2,3,4];
  //   setTimeout(()=>{
  //     resolve(rollno);
  //    //reject('error');
  //   })
  // })
  // function get(rollno){
  //   return new MyPromise((resolve,reject)=>{
  //     let user={
  //       data:'abhishek',
  //       age:32,
  //     }
  //     setTimeout((rollno)=>{
  //       resolve(`${user.data}${rollno} is mine`);
  //     },1000,rollno)
  //   })
  // }
  // obj.then((rollno)=>{
  //   console.log(rollno);
  //   return get(rollno[2]);
  // }).then((res)=>{console.log(res)}).catch((error)=>console.log(error));
  
  
  
  //////////////////////////////////////////////////////////////////////////eq-2
  
  // const learnt = true;
  
  // const study = new MyPromise( (resolve, reject) => {
  //     setTimeout(() => {
  //         if (learnt) {
  //             resolve(" second exam sucess.");
  //         } else {
  //             reject("second example reject");
  //         }
  //     }, 3000);
  // });
  // study.then((message) => console.log(message)).catch((error) => console.log(error));
  //////////////////////////////////////////////////////////////////
  
  
  //////////////////////eq-3
  // const promise = new MyPromise((resolve, reject) => {
  //     setTimeout(() => {
  //         resolve("checked");
         
  //     }, 2000);
  // });
  
  
  // promise.then((result) => {
  //     console.log(result);
  // }).catch((error) => {
  //     console.log(error);
  // })
  // ///////////////////////////// eq-4 multiple promise
  // var promise = new MyPromise(function(resolve, reject) {
  //   setTimeout(function() {
  //       resolve('hello world');
  //   }, 2000);
  // });
  
  // promise.then(function(data) {
  //   console.log(data + ' 1');
  // });
  
  // promise.then(function(data) {
  //   console.log(data + ' 2');
  // });
  
  // promise.then(function(data) {
  //   console.log(data + ' 3');
  // });
  ////////////////////////////////////////////////////////// eq-5 
  // var promise = new MyPromise(function(resolve, reject) {/// reject function
  //   setTimeout(function() {
  //       reject('We are all going to die');
  //   }, 2000);
  // });
  
  // promise.then(function success(data) {
  //   console.log(data);
  // }, function error(data) {
  //   console.error(data);
  // });
  /////////////////////////////////////////////////////////////////////////////eq-6 
  // var promise = new MyPromise(function(resolve, reject) {///////////////multiple rejects
  //   setTimeout(function() {
  //       reject('We are all going to die');
  //   }, 2000);
  // });
  
  // promise.then(function success(data) {
  //   console.log(data + ' 1');
  // }, function error(data) {
  //   console.error(data + ' 1');
  // });
  
  // promise.then(function success(data) {
  //   console.log(data + ' 2');
  // }, function error(data) {
  //   console.error(data + ' 2');
  // });
  
  // promise.then(function success(data) {
  //   console.log(data + ' 3');
  // }, function error(data) {
  //   console.error(data + ' 3');
  // });
  /////////////////////////////////////////////////////////////eq-7
  // var promise = new MyPromise(function(resolve, reject) {//calling multiple resolve
  //   setTimeout(function() {
  //       resolve('hello world 1');
  //       resolve('hello world 2');
  //       resolve('hello world 3');
  //       resolve('hello world 4');
  //   }, 1000);
  // });
  
  // promise.then(function success(data) {
  //   console.log(data);
  // });
  ///////////////////////////////////////////////////eq-8
  // var promise = new MyPromise(function(resolve, reject) {//multiple rejects
  //   setTimeout(function() {
  //       reject('hello world 1');
  //       reject('hello world 2');
        
  //   }, 1000);
  // });
  
  // promise.then(function success(data) {
  //   console.log(data);
  // });
  ///////////////////////////////////////////////////////////////////eq-9
  // function foo() {
  //   console.log('foo');
    
  //   return new MyPromise(resolve => {
  //     console.log('foo timeout before');
      
  //     setTimeout(() => {
  //       console.log('foo timeout');
  
  //       resolve('foo resolved');
  //     }, 1000);
      
  //     console.log('foo timeout after');
  //   });
  // }
  
  // function bar() {
  //   console.log('bar');
    
  //   return new MyPromise(resolve => {
  //     console.log('bar timeout before');
      
  //     setTimeout(() => {
  //       console.log('bar timeout');
        
  //       resolve('bar resolved');
  //     }, 3000);
      
  //     console.log('bar timeout after');
  //   });
  // }
  // foo()
  //   .then(function(res) {
  //     console.log('inside then 1: ' + res);
  //     return bar();
  //   })
  //   .then(function(res) {
  //     console.log('inside then 2: ' + res);
  //   });
  ///////////////////////////////////////////////////////////////eq-10
  function who() {
    return new MyPromise(resolve => { ///with async await
      setTimeout(() => {
        resolve('🤡');
      }, 200);
    });
  }
  
  function what() {
    return new MyPromise(resolve => {
      setTimeout(() => {
        resolve('lurks');
      }, 300);
    });
  }
  
  function where() {
    return new MyPromise(resolve => {
      setTimeout(() => {
        resolve('in the shadows');
      }, 500);
    });
  }
  
  async function msg() {
    const a = await who();
    const b = await what();
    const c = await where();
  
    console.log(`${ a } ${ b } ${ c }`);
  }
  
  msg();
  