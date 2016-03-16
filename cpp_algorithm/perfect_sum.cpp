// A Dynamic Programming solution for subset sum problem
#include <stdio.h>

#include<iostream>
#include<fstream>
#include<vector>
#include<string>

using namespace std;

vector<int>* indexes;

int margin = 5; // how far the closest sum is allowed to deviate from the requested sum
int delta = margin + 1; // the deviation of the closest sum
 
// Returns true if there is a subset of set[] with sun equal to given sum
int closestSubsetSum(vector<int> set, vector<string> names, int n, int sum)
{
	// list of which songs (indexes) were put together for that sum
	vector<int> lists[sum+1+margin][n+1];

	 // (subtract 1) array of how many songs were put together for this sum
    int subset[sum+1+margin][n+1];
 
    // If sum is 0, then answer is true
    for (int i = 0; i <= n; i++){
    	subset[0][i] = 1;
    }
 
    // If sum is not 0 and set is empty, then answer is false
    for (int i = 1; i <= sum + margin; i++){
    	subset[i][0] = 0;
    }
 
     // Fill the subset table in botton up manner
     for (int i = 1; i <= sum + margin; i++)
     {
		for (int j = 1; j <= n; j++)
		{
			bool bool1 = false; bool bool2 = false;

			// if it can be done without the current number
			if(subset[i][j-1]){
				bool1 = true;
			}

			// if it can be done with this
			else if (i >= set[j-1] && subset[i - set[j-1]][j-1]){
				bool2 = true;
			}

			// choose how to
			if(bool1 && bool2){
				bool1 = false; bool2 = false;
				double r = drand48();
				if(r < 0.5){
					bool1 = true;
				} else {
					bool2 = true;
				}
			}
			if (bool1){
				subset[i][j] = subset[i][j-1];
				lists[i][j] = lists[i][j-1]; // deep copy
			}
			else if (bool2){
				subset[i][j] = subset[i - set[j-1]][j-1] + 1;
				lists[i][j] = lists[i - set[j-1]][j-1]; // deep copy
				lists[i][j].push_back(j); // and append this indexes
			} else {
				subset[i][j] = 0;
			}
		}
     }

     delta = margin + 1;
     for(int i = 0; i <= margin; i++){
    	 if(subset[sum+i][n]){
    		 delta = i;
    		 break;
    	 }
    	 if(sum-i >= 0){
			 if(subset[sum-i][n]){
				 delta = -i;
				 break;
			 }
    	 }
     }

     indexes = new vector<int>(lists[sum+delta][n]); // copy
 
    // uncomment this code to print table
//     for (int i = 0; i <= sum + margin; i++)
//     {
//       for (int j = 0; j <= n; j++)
//          printf ("%4d", subset[i][j]-1);
//       printf("\n");
//     }
 
     return delta <= margin;
}
 
// Driver program to test above function
int main()
{
	vector<int> set{};
	vector<string> names{};
	int sum;

	ifstream myReadFile;
	myReadFile.open("input.txt");
	if (myReadFile.is_open()) {
		myReadFile >> sum;
		while (!myReadFile.eof()) {

			char in[100];
			myReadFile >> in;
			string name {in};
			names.push_back(name);

			myReadFile >> in;
			int duration = stoi(in);
			set.push_back(duration);

		}
	}
	myReadFile.close();

	set.pop_back();
	names.pop_back();

	int n = set.size();

	int closeMatch = closestSubsetSum(set, names, n, sum);

	if (closeMatch){
		cout<<"Found a subset for sum = " << sum + delta << " (request = " << sum <<")" << endl;
		for(int i = 0; i < indexes->size(); i++){
			cout<<names[(*indexes)[i]-1]<<" ";
		}
		cout<<endl;
	}
	else
		cout<<"No subset for sum = " << sum << endl;

	return 0;
}
