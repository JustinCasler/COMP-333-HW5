<?php

use PHPUnit\Framework\TestCase;

class MusicAppTest extends TestCase
{
    // Check Apache Web Server port here
    private $baseUri = "http://localhost:80/backend/index.php"; 

    public function testGet_UserList()
    {
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);
    
        
        $response = $client->request('GET', $this->baseUri, [
            'query' => [
                'action' => 'overview', 
                'sort_by' => 'artist'
            ]
        ]);
    
        $body = $response->getBody()->getContents();
        $responseData = json_decode($body, true);
    
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertArrayHasKey('ID', $responseData[0]);
        $this->assertArrayHasKey('username', $responseData[0]);
        $this->assertArrayHasKey('artist', $responseData[0]);
        $this->assertArrayHasKey('song', $responseData[0]);
        $this->assertArrayHasKey('rating', $responseData[0]);
    
    }


    // Test Register
    public function testPost_CreateUser()
{
    $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);

    $response = $client->request('POST', $this->baseUri, [
        'json' => [
            'action' => 'register',
            'inputs' => [
                'username' => 'newuser',
                'password' => 'newpassword'
            ]
        ]
    ]);

    $statusCode = $response->getStatusCode();
    $body = $response->getBody()->getContents();
    $responseData = json_decode($body, true);

    $this->assertEquals(200, $statusCode);
    $this->assertEquals(1, $responseData['status']);
    $this->assertEquals('Registration successful.', $responseData['message']);

    // Delete user so the test can be run again. 
    $deleteResponse = $client->request('POST', $this->baseUri, [
        'json' => [
            'action' => 'deleteuser',
            'username' => 'newuser',
        ]
    ]);

    $deleteStatusCode = $deleteResponse->getStatusCode();
    $deleteBody = $deleteResponse->getBody()->getContents();
    $deleteJsonData = json_decode(substr($deleteBody, strpos($deleteBody, '{')), true);


    $this->assertEquals(200, $deleteStatusCode);
    $this->assertEquals(1, $deleteJsonData['status']);
    $this->assertEquals('User deleted', $deleteJsonData['message']);
    }
    
    //Test failed Register 
    public function testPost_FailedCreateUser()
    {
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);
    
        // Create a user with the same username as in the previous test
        $response = $client->request('POST', $this->baseUri, [
            'json' => [
                'action' => 'register',
                'inputs' => [
                    'username' => 'existing_user_test_user',
                    'password' => 'existing_user_test_password'
                ]
            ]
        ]);
    
        $statusCode = $response->getStatusCode();
        $body = $response->getBody()->getContents();
        $responseData = json_decode($body, true);
    
        $this->assertEquals(200, $statusCode);
        $this->assertEquals(0, $responseData['status']);
        $this->assertEquals('Username is already taken.', $responseData['message']);
    }

    public function testPost_LoginUser()
    {
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);
    
        $response = $client->request('POST', $this->baseUri, [
            'json' => [
                'action' => 'login',
                'inputs' => [
                    'username' => 'existing_user_test_user',
                    'password' => 'existing_user_test_password'
                ]
            ]
        ]);
    
        $statusCode = $response->getStatusCode();
        $body = $response->getBody()->getContents();
        $responseData = json_decode($body, true);
    
        $this->assertEquals(200, $statusCode);
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('Login successful.', $responseData['message']);
    }
    
    public function testPost_FailedLogin()
    {
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);
    
        $response = $client->request('POST', $this->baseUri, [
            'json' => [
                'action' => 'login',
                'inputs' => [
                    'username' => 'nonexistentuser',
                    'password' => 'wrongpassword'
                ]
            ]
        ]);
    
        $responseData = json_decode($response->getBody(), true);
    
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(0, $responseData['status']);
        $this->assertEquals('Invalid username or password.', $responseData['message']);
        
    }

    public function testPost_NewSong()
    {
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);

        $response = $client->request('POST', $this->baseUri, [
            'json' => [
                'action' => 'addnew',
                'inputs' => [
                    'artist' => 'New Artist',
                    'song' => 'New Song',
                    'rating' => 5,
                ],
                'username' => 'existinguser',
                'password' => 'existingpassword',
            ]
        ]);
        $responseData = json_decode($response->getBody(), true);

        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('New Song Rating added', $responseData['message']);
    }

    public function testPost_updateSong()
    {
        // Assuming you have an existing song with ID 1 for testing the update
        // If not change $existingSongId to be any existing song id in the database
        $existingSongId = 1;
    
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);
    
        $response = $client->request('POST', $this->baseUri, [
            'json' => [
                'action' => 'update',
                'id' => $existingSongId,
                'inputs' => [
                    'artist' => 'Updated Artist',
                    'song' => 'Updated Song',
                    'rating' => 4,
                ],
            ]
        ]);
        $responseData = json_decode($response->getBody(), true);
    
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('Song Rating updated', $responseData['message']);
    }
    
    public function testPost_DeleteSong()
    {
        // Must change $existingSongId with each run of the tests
        $existingSongId = 1;
    
        $client = new GuzzleHttp\Client(['base_uri' => $this->baseUri]);
    
        $response = $client->request('POST', $this->baseUri, [
            'json' => [
                'action' => 'delete',
                'id' => $existingSongId,
            ]
        ]);
        $responseData = json_decode($response->getBody(), true);
    
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals(1, $responseData['status']);
        $this->assertEquals('Rating deleted', $responseData['message']);
    }
}