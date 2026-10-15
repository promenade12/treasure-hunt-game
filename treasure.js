// 模拟宝藏地图API
class TreasureMap {
    static getInitialClue() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("在古老的图书馆里找到了第一个线索...");
        }, 1000);
      });
    }
  
    static decodeAncientScript(clue) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!clue) {
            reject("没有线索可以解码!");
          }
          resolve("解码成功!宝藏在一座古老的神庙中...");
        }, 1500);
      });
    }
  
    static searchTemple(location) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const random = Math.random();
          if (random < 0.5) {
            reject("糟糕!遇到了神庙守卫!");
          }
          resolve("找到了一个神秘的箱子...");
        }, 2000);
      });
    }
  
    static openTreasureBox() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("恭喜!你找到了传说中的宝藏!");
        }, 1000);
      });
    }

    // =========新增自定义寻宝情节=========
    static crossRiver(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const r = Math.random();
                if(r<0.3){
                    reject("渡河失败！小船翻入河中，冒险终止");
                }else{
                    resolve("成功渡过湍急河流，向着神庙继续前进");
                }
            },1200)
        })
    }

    static solveStonePuzzle(){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
                const r = Math.random();
                if(r<0.25){
                    reject("石头谜题破解失败，石门永远关闭了");
                }else{
                    resolve("解开石壁谜题！神庙大门缓缓开启");
                }
            },1800)
        })
    }
}

// 原来的Promise链式版本（保留，用于对比）
function findTreasureWithPromises() {
  TreasureMap.getInitialClue()
    .then(clue => {
      console.log(clue);
      return TreasureMap.decodeAncientScript(clue);
    })
    .then(location => {
      console.log(location);
      return TreasureMap.searchTemple(location);
    })
    .then(box => {
      console.log(box);
      return TreasureMap.openTreasureBox();
    })
    .then(treasure => {
      console.log(treasure);
    })
    .catch(error => {
      console.error("任务失败:", error);
    });
}

// ========== 使用 async / await 重写寻宝（加入新增情节）==========
async function findTreasureAsyncAwait(){
  try{
    const clue = await TreasureMap.getInitialClue();
    addLog(clue); //输出到页面日志

    const decodeText = await TreasureMap.decodeAncientScript(clue);
    addLog(decodeText);

    //新增：渡河
    const riverMsg = await TreasureMap.crossRiver();
    addLog(riverMsg);

    //新增：解开石头谜题
    const puzzleMsg = await TreasureMap.solveStonePuzzle();
    addLog(puzzleMsg);

    const findBox = await TreasureMap.searchTemple(decodeText);
    addLog(findBox);

    const finalTreasure = await TreasureMap.openTreasureBox();
    addLog(finalTreasure);

  }catch(err){
    addLog(`❌任务失败：${err}`)
  }
}

//页面输出日志函数，后面页面动画要用
function addLog(text){
    const logDiv = document.getElementById("log-area");
    if(!logDiv) return;
    const p = document.createElement("p");
    p.innerText = text;
    logDiv.appendChild(p);
    //滚动到底部
    logDiv.scrollTop = logDiv.scrollHeight;
}

// 启动async版本寻宝
findTreasureAsyncAwait();
