Transitioner.setTransitions({
    'statistics->start': 'left-to-right',
    'start->statistics': 'right-to-left',
    'start->add': 'right-to-left',
    'add->start': 'left-to-right',
    'login->nubank': 'right-to-left',
    'nubank->login': 'left-to-right',
    'modify->start': 'left-to-right',
    'start->modify': 'right-to-left',
    'default': 'right-to-left'
  });
