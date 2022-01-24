
echo ---------------------------------------------------------
echo "Step 1: Create a game"
echo ---------------------------------------------------------


GAMEID=$(near call $CONTRACT initGame --amount 5 --account_id {NEAR_ACCOUNT} | tail -c 11)
#  GAMEID=2996046191

echo $GAMEID 
echo ---------------------------------------------------------
echo "Step 2: Join the game"
echo ---------------------------------------------------------
echo

near call $CONTRACT joinGame '{"_gameId": '$GAMEID'}' --amount 3 --accountId {NEAR_ACCOUNT}

echo ---------------------------------------------------------
echo "Step 3: Play the game"
echo ---------------------------------------------------------

near call $CONTRACT playGame '{"_gameId":'$GAMEID' , "_guess":3 }' --accountId {NEAR_ACCOUNT}

# echo ---------------------------------------------------------
# echo "Step 4: Delete Game (Optional)"
# echo ---------------------------------------------------------
# echo

# near call $CONTRACT deleteGame '{"_gameId":'$GAMEID' }' --accountId {NEAR_ACCOUNT}