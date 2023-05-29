# DVOP Dealers
Práce dělaná na předmět DVOP Webový backend. Projekt se skládá ze serveru (Node + Express) a frontendu (React). Jako databázové řešení jsme používali PostgreSQL. Zadáním bylo vytvořit API pro autobazar, kde lze přidávat auta a naopak auta i kupovat. Na uživatelovi akce se děly různé automatizace, jako posílání emailů. 

## Návrh databáze
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/50575836-3c07-435d-8e4e-790cb3a5cf28)

## Postup
Po tom, co jsme si vybrali téma práce, přišlo na řadu výběr technologií, které použijeme k zpracování tohoto projektu. Vybrali jsme si React. Zaprvé protože se hodí na podobný typ aplikací a zadruhé protože Lukáš Procházka s ním měl už nějaké zkušenosti a Sebastian Himmer se ho chtěl naučit. Databázi jsme dlouho nevybírali a využili snadnou a spolehlivou možnost Prisma spolu s PostgreSQL. Na frontend padl návrh MUI protože je to jednoduchá a spolehlivá knihovna pro React. Nakonec jsme se shodli na MUI Joy (podknihovna v MUI). První část práce byla navrhnout samotný backend s databází a jednotlivými endpointy. A také vše zdokumentovat. Kromě grafu databáze jsme se rozhodli použít Swagger, který nám poskytl jednoduchou a přehlednou dokumentaci jednotlivých endpointů s jejich popisy a příklady requestů i responsů. Po dodělání backednu přišel na řadu frontend. Sepsali jsme si jaké stránky přibližně chceme a jaké funkce bude každá mít. Následně jsme si rozdělili kdo jakou stránku udělá a dali se do práce. Nejdříve jsme vytvářeli hlavní části aplikace jako ukázku samotných aut, kde jsme hlavně pracovali na propojení databáze s naším frontendem. Nebo posílání emailů pomocí SMTP severu, které uživatel získává při prodání auta, nebo například nové registraci. Také automaticky generované formuláře pro přidání aut. Nebo zabezpečené registrování nových uživatelů. Přibližně jednou týdně jsme se sešli, abychom se domluvili jak jsme na tom, co ještě zbývá a jak podle toho postupovat dál. Postupně se nám projekt rozrůstal pod rukama až se dostal do dnešní hotové podoby.

## Ukázka práce
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/b1187c04-be58-4cd4-bec2-aa8d9d2f9525)
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/35bb326f-6e45-44f4-aa5b-f533eec05b36)
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/4041207b-6038-4f13-acae-1ba18440dfb1)
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/e031d18b-032c-4b4f-aa2a-8b893cb0b5ea)
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/396091dd-2f5e-4f48-97e4-087113047fcb)
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/240e8a51-abcd-4d79-92d5-7ec40e3a215a)
![image](https://github.com/Sebight/dvop-dealership/assets/59232422/45059b04-8ce2-4b01-9e00-68bf1c8d4b22)
