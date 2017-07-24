$.Velocity.RegisterEffect('transition.pushRightIn', {
    defaultDuration: 500,
    calls: [[{
      translateX: ['0%', '100%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushLeftOut', {
    defaultDuration: 500,
    calls: [[{
      translateX: ['-100%', '0%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushLeftIn', {
    defaultDuration: 500,
    calls: [[{
      translateX: ['0%', '-100%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushRightOut', {
    defaultDuration: 500,
    calls: [[{
      translateX: ['100%', '0%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushDownIn', {
    defaultDuration: 500,
    calls: [[{
      translateY: ['0%', '100%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushUpOut', {
    defaultDuration: 500,
    calls: [[{
      translateY: ['-100%', '0%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushUpIn', {
    defaultDuration: 500,
    calls: [[{
      translateY: ['0%', '-100%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  $.Velocity.RegisterEffect('transition.pushDownOut', {
    defaultDuration: 500
  }, {
    calls: [[{
      translateY: ['100%', '0%'],
      translateZ: 0,
      easing: "ease-in-out",
      opacity: [1, 1]
    }]]
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'main',
    to: 'slideRight',
    txIn: 'transition.slideRightBigIn',
    txOut: 'transition.slideLeftBigOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'slideRight',
    to: 'main',
    txIn: 'transition.slideLeftBigIn',
    txOut: 'transition.slideRightBigOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'main',
    to: 'slideLeft',
    txIn: 'transition.pushLeftIn',
    txOut: 'transition.pushRightOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'slideLeft',
    to: 'main',
    txIn: 'transition.pushRightIn',
    txOut: 'transition.pushLeftOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'main',
    to: 'slideUp',
    txIn: 'transition.perspectiveUpIn',
    txOut: 'transition.perspectiveDownOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'slideUp',
    to: 'main',
    txIn: [
      'transition.perspectiveDownIn', {
        duration: 2000,
        easing: 'ease-out'
      }
    ],
    txOut: [
      'transition.perspectiveUpOut', {
        duration: 2000,
        easing: 'ease-out'
      }
    ]
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'main',
    to: 'slideDown',
    txIn: 'transition.pushDownIn',
    txOut: 'transition.pushUpOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'slideDown',
    to: 'main',
    txIn: 'transition.pushUpIn',
    txOut: 'transition.pushDownOut'
  });
  FlowTransition.addTransition({
    section: 'body',
    from: 'contactDetail',
    to: 'contacts',
    txIn: 'transition.pushLeftIn',
    txOut: 'transition.pushRightOut'
  });
