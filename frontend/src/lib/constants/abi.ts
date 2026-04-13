export const BLUFF_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_confessionFee",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_unlockFee",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "AlreadyUnlocked",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "CannotUnlockOwn",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ConfessionNotFound",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "EmptyText",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientFee",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InsufficientUnlockFee",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidCategory",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "InvalidStateCode",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NotUnlocked",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ReentrancyGuardReentrantCall",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TransferFailed",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newFee",
        "type": "uint256"
      }
    ],
    "name": "ConfessionFeeUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "confessionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "confessor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "category",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "stateCode",
        "type": "uint8"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "blockNumber",
        "type": "uint256"
      }
    ],
    "name": "ConfessionPosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "confessionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "reader",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "confessorShare",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "devShare",
        "type": "uint256"
      }
    ],
    "name": "ConfessionUnlocked",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "oldFee",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "newFee",
        "type": "uint256"
      }
    ],
    "name": "UnlockFeeUpdated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "CONFESSOR_SHARE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "DEV_SHARE",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_CATEGORIES",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_STATE_CODE",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SHARE_DENOMINATOR",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "categoryStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "confessionCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalUnlockPaid",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_confessionId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_user",
        "type": "address"
      }
    ],
    "name": "checkUnlocked",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_text",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_category",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "_stateCode",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "_city",
        "type": "string"
      }
    ],
    "name": "confess",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "confessionCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "confessionFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "confessions",
    "outputs": [
      {
        "internalType": "address",
        "name": "confessor",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "text",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "category",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "stateCode",
        "type": "uint8"
      },
      {
        "internalType": "string",
        "name": "city",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "unlockCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalUnlockPaid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "blockPosted",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllCategoryStats",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "confessionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.CategoryStats[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllStateStats",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "confessionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unlockTxCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.StateStats[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_category",
        "type": "uint8"
      }
    ],
    "name": "getCategoryStats",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "confessionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.CategoryStats",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getConfessionFull",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "confessor",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "text",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "category",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "stateCode",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "unlockCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "blockPosted",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.Confession",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      }
    ],
    "name": "getConfessionPreview",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "confessor",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "category",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "stateCode",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "unlockCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "blockPosted",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.ConfessionPreview",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fromId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_toId",
        "type": "uint256"
      }
    ],
    "name": "getConfessionsBatch",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "confessor",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "category",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "stateCode",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "unlockCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "blockPosted",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.ConfessionPreview[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_count",
        "type": "uint256"
      }
    ],
    "name": "getLatestConfessionPreviews",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "confessor",
            "type": "address"
          },
          {
            "internalType": "uint8",
            "name": "category",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "stateCode",
            "type": "uint8"
          },
          {
            "internalType": "string",
            "name": "city",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "unlockCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "blockPosted",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.ConfessionPreview[]",
        "name": "",
        "type": "tuple[]"
      },
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProtocolStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "totalConfessions",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalUnlocksPaid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalConfessionFees",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_stateCode",
        "type": "uint8"
      }
    ],
    "name": "getStateStats",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "confessionCount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "totalUnlockPaid",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "unlockTxCount",
            "type": "uint256"
          }
        ],
        "internalType": "struct BluffConfessions.StateStats",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "hasUnlocked",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newFee",
        "type": "uint256"
      }
    ],
    "name": "setConfessionFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_newFee",
        "type": "uint256"
      }
    ],
    "name": "setUnlockFee",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "name": "stateStats",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "confessionCount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "totalUnlockPaid",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "unlockTxCount",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalFeesCollected",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalUnlockVolume",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_confessionId",
        "type": "uint256"
      }
    ],
    "name": "unlockConfession",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "unlockFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdrawFees",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
