#include <iostream>
#include <string>

using namespace std;

int find_needle(string haystack, string needle) {
    int n = haystack.length();
    int m = needle.length();
    for (int i = 0; i <= n - m; i++) {
        int j = 0;
        while (j < m && haystack[i+j] == needle[j]) {
            j++;
        }
        if (j == m) {
            return i;
        }
    }
    return -1;
}

int main() {
    string haystack = "sadbutsad";
    string needle = "sad";
    cin >> haystack;
    cin >> needle ;
    int index = find_needle(haystack, needle);
    cout << index << endl;
    return 0;
}
