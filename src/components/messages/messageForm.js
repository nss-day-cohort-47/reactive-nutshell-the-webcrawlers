// Created by : Sidney Crandall
// Created to allow users to send messages to their friends and fellow users

import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { getAllUsers } from '../../data/usersManager';
import { addMessage } from '../../data/MessageManager';

//function used to export a form 

