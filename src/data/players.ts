import { Player } from '../types';

export const players: Player[] = [
  // 60-70s Legends
  {
    id: 'wilt-chamberlain',
    name: 'Wilt Chamberlain',
    chineseName: '乾得膩伯林',
    position: 'C',
    era: '1960s-70s',
    height: 85, // 7'1"
    weight: 275,
    stats: { offense: 98, defense: 88, athleticism: 97, skill: 85, physical: 99, clutch: 85 }
  },
  {
    id: 'bill-russell',
    name: 'Bill Russell',
    chineseName: '乾得薩爾',
    position: 'C',
    era: '1960s',
    height: 82, // 6'10"
    weight: 215,
    stats: { offense: 72, defense: 99, athleticism: 90, skill: 78, physical: 85, clutch: 95 }
  },
  {
    id: 'kareem-abdul-jabbar',
    name: 'Kareem Abdul-Jabbar',
    chineseName: '乾力乾乾',
    position: 'C',
    era: '1970s-80s',
    height: 86, // 7'2"
    weight: 225,
    stats: { offense: 97, defense: 90, athleticism: 88, skill: 95, physical: 92, clutch: 88 }
  },
  {
    id: 'jerry-west',
    name: 'Jerry West',
    chineseName: '乾力乾斯',
    position: 'SG',
    era: '1960s-70s',
    height: 74, // 6'2"
    weight: 175,
    stats: { offense: 92, defense: 82, athleticism: 85, skill: 93, physical: 75, clutch: 98 }
  },
  {
    id: 'oscar-robertson',
    name: 'Oscar Robertson',
    chineseName: '大O乾伯森',
    position: 'PG',
    era: '1960s-70s',
    height: 77, // 6'5"
    weight: 205,
    stats: { offense: 94, defense: 80, athleticism: 82, skill: 95, physical: 82, clutch: 90 }
  },
  // 80s Legends
  {
    id: 'magic-johnson',
    name: 'Magic Johnson',
    chineseName: '魔術乾森',
    position: 'PG',
    era: '1980s-90s',
    height: 81, // 6'9"
    weight: 215,
    stats: { offense: 93, defense: 75, athleticism: 85, skill: 97, physical: 88, clutch: 95 }
  },
  {
    id: 'larry-bird',
    name: 'Larry Bird',
    chineseName: '乾力乾伯',
    position: 'SF',
    era: '1980s',
    height: 81, // 6'9"
    weight: 220,
    stats: { offense: 95, defense: 82, athleticism: 75, skill: 98, physical: 82, clutch: 97 }
  },
  {
    id: 'isiah-thomas',
    name: 'Isiah Thomas',
    chineseName: '乾乾湯瑪斯',
    position: 'PG',
    era: '1980s-90s',
    height: 73, // 6'1"
    weight: 180,
    stats: { offense: 88, defense: 78, athleticism: 85, skill: 94, physical: 72, clutch: 92 }
  },
  {
    id: 'moses-malone',
    name: 'Moses Malone',
    chineseName: '摩西馬龍',
    position: 'C',
    era: '1980s',
    height: 82, // 6'10"
    weight: 255,
    stats: { offense: 90, defense: 82, athleticism: 82, skill: 80, physical: 92, clutch: 85 }
  },
  {
    id: 'dominique-wilkins',
    name: 'Dominique Wilkins',
    chineseName: '乾乾威金斯',
    position: 'SF',
    era: '1980s-90s',
    height: 80, // 6'8"
    weight: 215,
    stats: { offense: 93, defense: 72, athleticism: 96, skill: 88, physical: 85, clutch: 82 }
  },
  // 90s Legends
  {
    id: 'michael-jordan',
    name: 'Michael Jordan',
    chineseName: '麥可乾丹',
    position: 'SG',
    era: '1990s',
    height: 78, // 6'6"
    weight: 195,
    stats: { offense: 99, defense: 95, athleticism: 98, skill: 99, physical: 88, clutch: 99 }
  },
  {
    id: 'scottie-pippen',
    name: 'Scottie Pippen',
    chineseName: '乾提皮朋',
    position: 'SF',
    era: '1990s',
    height: 80, // 6'8"
    weight: 210,
    stats: { offense: 82, defense: 95, athleticism: 90, skill: 88, physical: 85, clutch: 78 }
  },
  {
    id: 'hakeem-olajuwon',
    name: 'Hakeem Olajuwon',
    chineseName: '乾金乾拉朱旺',
    position: 'C',
    era: '1990s',
    height: 84, // 7'0"
    weight: 255,
    stats: { offense: 94, defense: 96, athleticism: 90, skill: 97, physical: 90, clutch: 92 }
  },
  {
    id: 'charles-barkley',
    name: 'Charles Barkley',
    chineseName: '乾爾斯巴克利',
    position: 'PF',
    era: '1990s',
    height: 78, // 6'6"
    weight: 250,
    stats: { offense: 90, defense: 78, athleticism: 88, skill: 85, physical: 95, clutch: 82 }
  },
  {
    id: 'john-stockton',
    name: 'John Stockton',
    chineseName: '約翰史乾頓',
    position: 'PG',
    era: '1990s',
    height: 73, // 6'1"
    weight: 175,
    stats: { offense: 82, defense: 88, athleticism: 75, skill: 96, physical: 72, clutch: 88 }
  },
  {
    id: 'karl-malone',
    name: 'Karl Malone',
    chineseName: '乾爾馬龍',
    position: 'PF',
    era: '1990s',
    height: 81, // 6'9"
    weight: 250,
    stats: { offense: 92, defense: 82, athleticism: 88, skill: 85, physical: 96, clutch: 75 }
  },
  {
    id: 'david-robinson',
    name: 'David Robinson',
    chineseName: '乾維乾濱森',
    position: 'C',
    era: '1990s',
    height: 85, // 7'1"
    weight: 235,
    stats: { offense: 88, defense: 94, athleticism: 95, skill: 85, physical: 92, clutch: 85 }
  },
  {
    id: 'patrick-ewing',
    name: 'Patrick Ewing',
    chineseName: '乾崔克尤乾',
    position: 'C',
    era: '1990s',
    height: 84, // 7'0"
    weight: 240,
    stats: { offense: 88, defense: 88, athleticism: 85, skill: 88, physical: 90, clutch: 80 }
  },
  {
    id: 'gary-payton',
    name: 'Gary Payton',
    chineseName: '乾瑞乾頓',
    position: 'PG',
    era: '1990s-2000s',
    height: 76, // 6'4"
    weight: 180,
    stats: { offense: 82, defense: 96, athleticism: 82, skill: 90, physical: 78, clutch: 85 }
  },
  {
    id: 'reggie-miller',
    name: 'Reggie Miller',
    chineseName: '乾吉米勒',
    position: 'SG',
    era: '1990s-2000s',
    height: 79, // 6'7"
    weight: 185,
    stats: { offense: 88, defense: 72, athleticism: 78, skill: 92, physical: 75, clutch: 96 }
  },
  // 2000s Legends
  {
    id: 'kobe-bryant',
    name: 'Kobe Bryant',
    chineseName: '乾比乾萊乾',
    position: 'SG',
    era: '2000s-10s',
    height: 78, // 6'6"
    weight: 212,
    stats: { offense: 97, defense: 90, athleticism: 94, skill: 98, physical: 85, clutch: 98 }
  },
  {
    id: 'shaquille-oneal',
    name: "Shaquille O'Neal",
    chineseName: '乾乾乾歐尼乾',
    position: 'C',
    era: '2000s',
    height: 85, // 7'1"
    weight: 325,
    stats: { offense: 95, defense: 82, athleticism: 92, skill: 78, physical: 99, clutch: 85 }
  },
  {
    id: 'tim-duncan',
    name: 'Tim Duncan',
    chineseName: '提姆鄧乾',
    position: 'PF',
    era: '2000s-10s',
    height: 83, // 6'11"
    weight: 250,
    stats: { offense: 90, defense: 95, athleticism: 80, skill: 95, physical: 90, clutch: 92 }
  },
  {
    id: 'allen-iverson',
    name: 'Allen Iverson',
    chineseName: '艾乾艾佛森',
    position: 'PG',
    era: '2000s',
    height: 72, // 6'0"
    weight: 165,
    stats: { offense: 94, defense: 75, athleticism: 92, skill: 96, physical: 65, clutch: 95 }
  },
  {
    id: 'kevin-garnett',
    name: 'Kevin Garnett',
    chineseName: '乾文乾乾特',
    position: 'PF',
    era: '2000s-10s',
    height: 83, // 6'11"
    weight: 220,
    stats: { offense: 85, defense: 96, athleticism: 90, skill: 88, physical: 85, clutch: 88 }
  },
  {
    id: 'dirk-nowitzki',
    name: 'Dirk Nowitzki',
    chineseName: '乾克諾威斯基',
    position: 'PF',
    era: '2000s-10s',
    height: 84, // 7'0"
    weight: 245,
    stats: { offense: 94, defense: 72, athleticism: 75, skill: 96, physical: 82, clutch: 92 }
  },
  {
    id: 'steve-nash',
    name: 'Steve Nash',
    chineseName: '史蒂夫納什',
    position: 'PG',
    era: '2000s-10s',
    height: 75, // 6'3"
    weight: 178,
    stats: { offense: 88, defense: 65, athleticism: 78, skill: 97, physical: 68, clutch: 88 }
  },
  {
    id: 'jason-kidd',
    name: 'Jason Kidd',
    chineseName: '乾森乾德',
    position: 'PG',
    era: '2000s',
    height: 76, // 6'4"
    weight: 210,
    stats: { offense: 80, defense: 88, athleticism: 82, skill: 92, physical: 78, clutch: 85 }
  },
  {
    id: 'tracy-mcgrady',
    name: 'Tracy McGrady',
    chineseName: '乾西麥乾雷迪',
    position: 'SG',
    era: '2000s',
    height: 80, // 6'8"
    weight: 210,
    stats: { offense: 95, defense: 78, athleticism: 92, skill: 94, physical: 82, clutch: 88 }
  },
  {
    id: 'vince-carter',
    name: 'Vince Carter',
    chineseName: '乾斯乾特',
    position: 'SG',
    era: '2000s',
    height: 78, // 6'6"
    weight: 220,
    stats: { offense: 90, defense: 75, athleticism: 98, skill: 88, physical: 85, clutch: 82 }
  },
  {
    id: 'ray-allen',
    name: 'Ray Allen',
    chineseName: '乾乾艾倫',
    position: 'SG',
    era: '2000s-10s',
    height: 77, // 6'5"
    weight: 205,
    stats: { offense: 88, defense: 75, athleticism: 82, skill: 94, physical: 78, clutch: 95 }
  },
  {
    id: 'paul-pierce',
    name: 'Paul Pierce',
    chineseName: '保羅皮爾斯',
    position: 'SF',
    era: '2000s-10s',
    height: 79, // 6'7"
    weight: 235,
    stats: { offense: 88, defense: 78, athleticism: 78, skill: 92, physical: 82, clutch: 94 }
  },
  // 2010s Legends
  {
    id: 'lebron-james',
    name: 'LeBron James',
    chineseName: '勒乾朗詹姆斯',
    position: 'SF',
    era: '2010s-20s',
    height: 81, // 6'9"
    weight: 250,
    stats: { offense: 97, defense: 88, athleticism: 96, skill: 95, physical: 97, clutch: 92 }
  },
  {
    id: 'kevin-durant',
    name: 'Kevin Durant',
    chineseName: '乾文杜蘭特',
    position: 'SF',
    era: '2010s-20s',
    height: 83, // 6'11"
    weight: 240,
    stats: { offense: 98, defense: 82, athleticism: 88, skill: 97, physical: 85, clutch: 92 }
  },
  {
    id: 'stephen-curry',
    name: 'Stephen Curry',
    chineseName: '史蒂芬柯瑞',
    position: 'PG',
    era: '2010s-20s',
    height: 74, // 6'2"
    weight: 185,
    stats: { offense: 97, defense: 72, athleticism: 82, skill: 99, physical: 72, clutch: 96 }
  },
  {
    id: 'james-harden',
    name: 'James Harden',
    chineseName: '詹姆斯哈登',
    position: 'SG',
    era: '2010s-20s',
    height: 77, // 6'5"
    weight: 220,
    stats: { offense: 96, defense: 70, athleticism: 80, skill: 96, physical: 82, clutch: 78 }
  },
  {
    id: 'russell-westbrook',
    name: 'Russell Westbrook',
    chineseName: '羅素乾斯布乾克',
    position: 'PG',
    era: '2010s-20s',
    height: 75, // 6'3"
    weight: 200,
    stats: { offense: 88, defense: 78, athleticism: 98, skill: 85, physical: 88, clutch: 82 }
  },
  {
    id: 'chris-paul',
    name: 'Chris Paul',
    chineseName: '克里斯乾爾',
    position: 'PG',
    era: '2010s-20s',
    height: 72, // 6'0"
    weight: 175,
    stats: { offense: 88, defense: 88, athleticism: 78, skill: 97, physical: 72, clutch: 85 }
  },
  {
    id: 'kawhi-leonard',
    name: 'Kawhi Leonard',
    chineseName: '乾懷乾納德',
    position: 'SF',
    era: '2010s-20s',
    height: 79, // 6'7"
    weight: 225,
    stats: { offense: 92, defense: 97, athleticism: 88, skill: 92, physical: 90, clutch: 95 }
  },
  {
    id: 'anthony-davis',
    name: 'Anthony Davis',
    chineseName: '安乾尼乾維斯',
    position: 'PF',
    era: '2010s-20s',
    height: 82, // 6'10"
    weight: 253,
    stats: { offense: 90, defense: 94, athleticism: 92, skill: 88, physical: 92, clutch: 85 }
  },
  {
    id: 'dwyane-wade',
    name: 'Dwyane Wade',
    chineseName: '乾乾恩乾德',
    position: 'SG',
    era: '2010s',
    height: 76, // 6'4"
    weight: 220,
    stats: { offense: 92, defense: 85, athleticism: 92, skill: 92, physical: 85, clutch: 92 }
  },
  {
    id: 'kyrie-irving',
    name: 'Kyrie Irving',
    chineseName: '乾乾乾文',
    position: 'PG',
    era: '2010s-20s',
    height: 74, // 6'2"
    weight: 195,
    stats: { offense: 92, defense: 72, athleticism: 85, skill: 98, physical: 75, clutch: 92 }
  },
  // 2020s Stars
  {
    id: 'giannis-antetokounmpo',
    name: 'Giannis Antetokounmpo',
    chineseName: '乾尼斯阿乾托昆乾',
    position: 'PF',
    era: '2020s',
    height: 83, // 6'11"
    weight: 243,
    stats: { offense: 94, defense: 92, athleticism: 98, skill: 82, physical: 96, clutch: 88 }
  },
  {
    id: 'luka-doncic',
    name: 'Luka Doncic',
    chineseName: '盧卡東契奇',
    position: 'PG',
    era: '2020s',
    height: 79, // 6'7"
    weight: 230,
    stats: { offense: 95, defense: 72, athleticism: 78, skill: 96, physical: 85, clutch: 90 }
  },
  {
    id: 'jayson-tatum',
    name: 'Jayson Tatum',
    chineseName: '乾森塔圖姆',
    position: 'SF',
    era: '2020s',
    height: 80, // 6'8"
    weight: 210,
    stats: { offense: 92, defense: 82, athleticism: 88, skill: 90, physical: 85, clutch: 88 }
  },
  {
    id: 'joel-embiid',
    name: 'Joel Embiid',
    chineseName: '乾爾乾比德',
    position: 'C',
    era: '2020s',
    height: 84, // 7'0"
    weight: 280,
    stats: { offense: 94, defense: 88, athleticism: 85, skill: 92, physical: 95, clutch: 85 }
  },
  {
    id: 'nikola-jokic',
    name: 'Nikola Jokic',
    chineseName: '尼古乾約基奇',
    position: 'C',
    era: '2020s',
    height: 83, // 6'11"
    weight: 284,
    stats: { offense: 95, defense: 78, athleticism: 65, skill: 98, physical: 88, clutch: 92 }
  },
];

export const getPlayerById = (id: string): Player | undefined => {
  return players.find(p => p.id === id);
};
