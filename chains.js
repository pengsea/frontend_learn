//责任链模式
let chains = [];

function approve(req) {
  let index = 0;
  let next = () => {
    let func = chains[index];
    index++;
    if (!!func) {
      return func(req, next);
    }
  };
  next();
}

function def(func) {
  chains.push(func);
}

def((req, next) => {
  if (req.amount < 50000) {
    console.log('主任审批通过!');
    return true;
  } else {
    next();
  }
});
def((req, next) => {
  let {amount} = req;
  if (amount >= 50000 && amount < 100000) {
    console.log('副董事长审批通过!');
    return true;
  } else {
    next();
  }
});
def((req, next) => {
  let {amount} = req;
  if (amount >= 100000 && amount < 500000) {
    console.log('董事长审批通过!');
    return true;
  } else {
    next();
  }
});
def((req, next) => {
  let {amount} = req;
  if (amount >= 500000&&amount < 5000000) {
    console.log('董事会审批通过!');
    return true;
  } else {
    next();
  }
});
def((req, next) => {
  let ok = next();
  if (!ok) {
    console.error(`${req.amount}金额无人审批通过!`);
  }
});
approve({amount: 100});
approve({amount: 80000});
approve({amount: 180000});
approve({amount: 580000});
approve({amount: 5800000});
