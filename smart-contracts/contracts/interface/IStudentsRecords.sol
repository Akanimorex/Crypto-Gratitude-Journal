// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IStudentsRecords {
  function addStudent(string memory _name, uint _age, string memory _course) external;

  function updateStudent(
        uint _id,
        string memory _name,
        uint _age,
        string memory _course       
    ) external;
    
}


